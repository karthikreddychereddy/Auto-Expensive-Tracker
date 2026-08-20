package com.paisatrack.backend.ai.client.model;

import lombok.Data;

import java.util.List;

@Data
public class GroqRequest {

    private String model;
    private List<GroqMessage> messages;

}