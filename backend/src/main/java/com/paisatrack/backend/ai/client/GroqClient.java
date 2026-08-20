package com.paisatrack.backend.ai.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.paisatrack.backend.ai.client.model.GroqChoice;
import com.paisatrack.backend.ai.client.model.GroqMessage;
import com.paisatrack.backend.ai.client.model.GroqRequest;
import com.paisatrack.backend.ai.client.model.GroqResponse;
import com.paisatrack.backend.ai.exception.AIException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class GroqClient implements LLMClient {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.model}")
    private String model;

    public GroqClient(
            WebClient groqWebClient,
            ObjectMapper objectMapper
    ) {

        this.webClient =
                groqWebClient;

        this.objectMapper =
                objectMapper;
    }

    /*
     * ==========================================
     * EXISTING NON-STREAMING REQUEST
     * ==========================================
     *
     * Keep this method because other features,
     * including Receipt Scanner, may still use it.
     */
    @Override
    public String generateResponse(
            String prompt
    ) {

        try {

            GroqRequest request =
                    buildRequest(
                            prompt
                    );

            GroqResponse response =
                    webClient
                            .post()

                            .uri(
                                    "/chat/completions"
                            )

                            .header(
                                    HttpHeaders.AUTHORIZATION,
                                    "Bearer " + apiKey
                            )

                            .contentType(
                                    MediaType.APPLICATION_JSON
                            )

                            .accept(
                                    MediaType.APPLICATION_JSON
                            )

                            .bodyValue(
                                    request
                            )

                            .retrieve()

                            .onStatus(
                                    status ->
                                            status.isError(),

                                    clientResponse ->
                                            clientResponse
                                                    .bodyToMono(
                                                            String.class
                                                    )
                                                    .defaultIfEmpty(
                                                            ""
                                                    )
                                                    .flatMap(
                                                            body -> {

                                                                logGroqError(
                                                                        clientResponse
                                                                                .statusCode()
                                                                                .toString(),
                                                                        body
                                                                );

                                                                return Mono.error(
                                                                        new AIException(
                                                                                "Groq API returned "
                                                                                        + clientResponse
                                                                                        .statusCode()
                                                                                        + ": "
                                                                                        + body
                                                                        )
                                                                );
                                                            }
                                                    )
                            )

                            .bodyToMono(
                                    GroqResponse.class
                            )

                            .timeout(
                                    Duration.ofSeconds(
                                            60
                                    )
                            )

                            .block();

            return extractResponse(
                    response
            );

        } catch (
                AIException ex
        ) {

            throw ex;

        } catch (
                Exception ex
        ) {

            ex.printStackTrace();

            throw new AIException(
                    "Failed to communicate with Groq API.",
                    ex
            );
        }
    }

    /*
     * ==========================================
     * NEW TRUE STREAMING REQUEST
     * ==========================================
     *
     * Groq returns Server-Sent Events such as:
     *
     * data: {...}
     * data: {...}
     * data: [DONE]
     *
     * This method converts those events into
     * a Flux<String> where every item is only
     * the newly generated text.
     */
    @Override
    public Flux<String> streamResponse(
            String prompt
    ) {

        Map<String, Object> request =
                buildStreamingRequest(
                        prompt
                );

        return webClient
                .post()

                .uri(
                        "/chat/completions"
                )

                .header(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + apiKey
                )

                .contentType(
                        MediaType.APPLICATION_JSON
                )

                /*
                 * Streaming response.
                 */
                .accept(
                        MediaType.TEXT_EVENT_STREAM
                )

                .bodyValue(
                        request
                )

                /*
                 * exchangeToFlux gives us direct
                 * access to the response status
                 * before consuming the stream.
                 */
                .exchangeToFlux(
                        response -> {

                            if (
                                    response
                                            .statusCode()
                                            .isError()
                            ) {

                                return response
                                        .bodyToMono(
                                                String.class
                                        )
                                        .defaultIfEmpty(
                                                ""
                                        )
                                        .flatMapMany(
                                                body -> {

                                                    logGroqError(
                                                            response
                                                                    .statusCode()
                                                                    .toString(),
                                                            body
                                                    );

                                                    return Flux.error(
                                                            new AIException(
                                                                    "Groq API returned "
                                                                            + response
                                                                            .statusCode()
                                                                            + ": "
                                                                            + body
                                                            )
                                                    );
                                                }
                                        );
                            }

                            return response
                                    .bodyToFlux(
                                            String.class
                                    );
                        }
                )

                /*
                 * Parse every SSE event.
                 */
                .flatMap(
                        this::extractStreamingContent
                )

                /*
                 * Ignore empty chunks.
                 */
                .filter(
                        chunk ->
                                chunk != null &&
                                !chunk.isEmpty()
                )

                /*
                 * Protect against a request that
                 * hangs forever.
                 */
                .timeout(
                        Duration.ofSeconds(
                                90
                        )
                )

                .onErrorMap(
                        throwable -> {

                            if (
                                    throwable
                                            instanceof AIException
                            ) {

                                return throwable;
                            }

                            return new AIException(
                                    "Failed while streaming response from Groq.",
                                    throwable
                            );
                        }
                );
    }

    /*
     * Existing request object.
     */
    private GroqRequest buildRequest(
            String prompt
    ) {

        GroqMessage message =
                new GroqMessage(
                        "user",
                        prompt
                );

        GroqRequest request =
                new GroqRequest();

        request.setModel(
                model
        );

        request.setMessages(
                List.of(
                        message
                )
        );

        return request;
    }

    /*
     * Streaming requests need:
     *
     * "stream": true
     *
     * We use a Map here so you do not need
     * to change GroqRequest.java just for
     * the streaming flag.
     */
    private Map<String, Object>
    buildStreamingRequest(
            String prompt
    ) {

        Map<String, Object> message =
                new HashMap<>();

        message.put(
                "role",
                "user"
        );

        message.put(
                "content",
                prompt
        );

        Map<String, Object> request =
                new HashMap<>();

        request.put(
                "model",
                model
        );

        request.put(
                "messages",
                List.of(
                        message
                )
        );

        request.put(
                "stream",
                true
        );

        return request;
    }

    /*
     * Parse one Groq streaming event.
     *
     * Expected structure:
     *
     * {
     *   "choices": [
     *     {
     *       "delta": {
     *         "content": "Hello"
     *       }
     *     }
     *   ]
     * }
     */
    private Mono<String>
    extractStreamingContent(
            String rawChunk
    ) {

        if (
                rawChunk == null ||
                rawChunk.isBlank()
        ) {

            return Mono.empty();
        }

        String chunk =
                rawChunk.trim();

        /*
         * Depending on WebClient decoding,
         * SSE lines may still contain
         * the "data:" prefix.
         */
        if (
                chunk.startsWith(
                        "data:"
                )
        ) {

            chunk =
                    chunk
                            .substring(
                                    5
                            )
                            .trim();
        }

        /*
         * End of Groq stream.
         */
        if (
                "[DONE]".equals(
                        chunk
                )
        ) {

            return Mono.empty();
        }

        try {

            JsonNode root =
                    objectMapper
                            .readTree(
                                    chunk
                            );

            JsonNode choices =
                    root.path(
                            "choices"
                    );

            if (
                    !choices.isArray() ||
                    choices.isEmpty()
            ) {

                return Mono.empty();
            }

            JsonNode delta =
                    choices
                            .get(0)
                            .path(
                                    "delta"
                            );

            JsonNode content =
                    delta.path(
                            "content"
                    );

            if (
                    content.isMissingNode() ||
                    content.isNull()
            ) {

                return Mono.empty();
            }

            String text =
                    content.asText();

            if (
                    text == null ||
                    text.isEmpty()
            ) {

                return Mono.empty();
            }

            return Mono.just(
                    text
            );

        } catch (
                Exception ex
        ) {

            /*
             * Sometimes streaming transports
             * can include heartbeat/blank events.
             *
             * We skip those rather than failing
             * the entire conversation.
             */
            System.err.println(
                    "Unable to parse Groq stream chunk:"
            );

            System.err.println(
                    rawChunk
            );

            return Mono.empty();
        }
    }

    private String extractResponse(
            GroqResponse response
    ) {

        if (
                response == null
        ) {

            throw new AIException(
                    "Groq returned an empty response."
            );
        }

        if (
                response.getChoices() == null ||
                response
                        .getChoices()
                        .isEmpty()
        ) {

            throw new AIException(
                    "Groq returned no choices."
            );
        }

        GroqChoice choice =
                response
                        .getChoices()
                        .get(0);

        if (
                choice.getMessage() == null
        ) {

            throw new AIException(
                    "Groq returned no message."
            );
        }

        String answer =
                choice
                        .getMessage()
                        .getContent();

        if (
                answer == null ||
                answer.isBlank()
        ) {

            throw new AIException(
                    "Groq returned an empty response."
            );
        }

        return answer.trim();
    }

    private void logGroqError(
            String status,
            String body
    ) {

        System.err.println(
                "========== GROQ API ERROR =========="
        );

        System.err.println(
                "Status = "
                        + status
        );

        System.err.println(
                "Body = "
                        + body
        );

        System.err.println(
                "Model = "
                        + model
        );

        System.err.println(
                "===================================="
        );
    }
}