package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.ReceiptAIResponse;
import com.paisatrack.backend.dto.ReceiptScanResponse;
import com.paisatrack.backend.service.ReceiptAIService;
import com.paisatrack.backend.service.ReceiptService;
import com.paisatrack.backend.util.ReceiptParser;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ReceiptServiceImpl implements ReceiptService {

    private final Tesseract tesseract;
    private final ReceiptAIService receiptAIService;

    @Override
    public ReceiptScanResponse scanReceipt(MultipartFile image) {

        validateImage(image);

        File tempFile = null;

        try {

            tempFile = File.createTempFile(
                    "receipt-",
                    ".png"
            );

            BufferedImage originalImage =
                    ImageIO.read(image.getInputStream());

            if (originalImage == null) {
                throw new RuntimeException(
                        "Unable to read receipt image."
                );
            }

            int originalWidth =
                    originalImage.getWidth();

            int originalHeight =
                    originalImage.getHeight();

            int targetWidth =
                    Math.max(originalWidth * 2, 1600);

            int targetHeight =
                    (int) (
                            (double) originalHeight
                                    / originalWidth
                                    * targetWidth
                    );

            Image resizedImage =
                    originalImage.getScaledInstance(
                            targetWidth,
                            targetHeight,
                            Image.SCALE_SMOOTH
                    );

            BufferedImage processedImage =
                    new BufferedImage(
                            targetWidth,
                            targetHeight,
                            BufferedImage.TYPE_INT_RGB
                    );

            Graphics2D graphics =
                    processedImage.createGraphics();

            graphics.drawImage(
                    resizedImage,
                    0,
                    0,
                    null
            );

            graphics.dispose();

            ImageIO.write(
                    processedImage,
                    "png",
                    tempFile
            );

            tesseract.setPageSegMode(6);
            tesseract.setOcrEngineMode(1);

            String extractedText =
                    tesseract.doOCR(tempFile);

            System.out.println(
                    "========== OCR TEXT =========="
            );

            System.out.println(extractedText);

            System.out.println(
                    "=============================="
            );

            if (extractedText == null ||
                    extractedText.trim().isEmpty()) {

                throw new RuntimeException(
                        "OCR could not extract any text from the receipt. " +
                        "Please upload a clearer receipt image."
                );
            }

            String cleanText =
                    extractedText.trim();

            /*
             * Create local OCR result first.
             *
             * This acts as a fallback if Groq is slow,
             * unavailable, rate-limited, or fails.
             */
            ReceiptScanResponse fallback =
                    ReceiptParser.parse(cleanText);

            try {

                /*
                 * AI improves the OCR result.
                 */
                ReceiptAIResponse aiResponse =
                        receiptAIService.improveReceipt(
                                cleanText
                        );

                System.out.println(
                        "========== AI RESPONSE =========="
                );

                System.out.println(
                        "Merchant     = " +
                                aiResponse.getMerchant()
                );

                System.out.println(
                        "Amount       = " +
                                aiResponse.getAmount()
                );

                System.out.println(
                        "GST          = " +
                                aiResponse.getGst()
                );

                System.out.println(
                        "Date         = " +
                                aiResponse.getDate()
                );

                System.out.println(
                        "Payment Mode = " +
                                aiResponse.getPaymentMode()
                );

                System.out.println(
                        "Category     = " +
                                aiResponse.getCategory()
                );

                System.out.println(
                        "================================="
                );

                /*
                 * Prefer AI values.
                 *
                 * If AI could not determine something,
                 * use the local OCR parser result.
                 */
                return ReceiptScanResponse.builder()

                        .merchant(
                                valueOrFallback(
                                        aiResponse.getMerchant(),
                                        fallback.getMerchant()
                                )
                        )

                        .amount(
                                aiResponse.getAmount() != null
                                        ? aiResponse.getAmount()
                                        : fallback.getAmount()
                        )

                        .gst(
                                aiResponse.getGst() != null
                                        ? aiResponse.getGst()
                                        : fallback.getGst()
                        )

                        .date(
                                aiResponse.getDate() != null
                                        ? aiResponse.getDate()
                                        : fallback.getDate()
                        )

                        .paymentMode(
                                valueOrFallback(
                                        aiResponse.getPaymentMode(),
                                        fallback.getPaymentMode()
                                )
                        )

                        .category(
                                valueOrFallback(
                                        aiResponse.getCategory(),
                                        fallback.getCategory()
                                )
                        )

                        .extractedText(cleanText)

                        .build();

            } catch (Exception aiException) {

                /*
                 * IMPORTANT:
                 *
                 * AI failure should NOT make the entire
                 * receipt scanner fail.
                 *
                 * OCR already succeeded, so return the
                 * locally parsed receipt.
                 */
                System.err.println(
                        "========== RECEIPT AI FALLBACK =========="
                );

                System.err.println(
                        "AI enrichment failed."
                );

                System.err.println(
                        "Returning OCR parsed result instead."
                );

                System.err.println(
                        "Reason: " +
                                aiException.getMessage()
                );

                System.err.println(
                        "========================================="
                );

                return fallback;
            }

        } catch (IOException ex) {

            throw new RuntimeException(
                    "Unable to process receipt image.",
                    ex
            );

        } catch (TesseractException ex) {

            throw new RuntimeException(
                    "OCR processing failed.",
                    ex
            );

        } finally {

            if (tempFile != null &&
                    tempFile.exists() &&
                    !tempFile.delete()) {

                tempFile.deleteOnExit();
            }
        }
    }

    private String valueOrFallback(
            String aiValue,
            String fallbackValue
    ) {

        if (aiValue == null ||
                aiValue.isBlank() ||
                "Unknown".equalsIgnoreCase(aiValue)) {

            return fallbackValue;
        }

        return aiValue;
    }

    private void validateImage(
            MultipartFile image
    ) {

        if (image == null ||
                image.isEmpty()) {

            throw new IllegalArgumentException(
                    "Receipt image is required."
            );
        }

        String contentType =
                image.getContentType();

        if (contentType == null ||
                !contentType.startsWith("image/")) {

            throw new IllegalArgumentException(
                    "Only image files are allowed."
            );
        }
    }
}