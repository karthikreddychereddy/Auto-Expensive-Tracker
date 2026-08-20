package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.ReceiptScanResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ReceiptService {

    ReceiptScanResponse scanReceipt(
            MultipartFile image
    );

}