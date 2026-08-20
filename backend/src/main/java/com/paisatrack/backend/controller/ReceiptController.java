package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.ReceiptScanResponse;
import com.paisatrack.backend.service.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/receipt")
@RequiredArgsConstructor
public class ReceiptController {

    private final ReceiptService receiptService;

    @PostMapping("/scan")
    public ResponseEntity<ReceiptScanResponse> scanReceipt(
            @RequestParam("image") MultipartFile image
    ) {

        ReceiptScanResponse response = receiptService.scanReceipt(image);

        return ResponseEntity.ok(response);
    }
}