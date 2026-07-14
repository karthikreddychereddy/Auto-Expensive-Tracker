package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.InsightsResponse;
import com.paisatrack.backend.service.InsightsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/insights")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InsightsController {

    private final InsightsService insightsService;

    @GetMapping
    public ResponseEntity<InsightsResponse> getInsights() {
        return ResponseEntity.ok(insightsService.getInsights());
    }
}