package com.paisatrack.backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface AIFileService {

    String extractText(MultipartFile file);
}