package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.AIChatRequest;
import com.paisatrack.backend.dto.AIChatResponse;

public interface AIChatService {

    AIChatResponse chat(AIChatRequest request);

}