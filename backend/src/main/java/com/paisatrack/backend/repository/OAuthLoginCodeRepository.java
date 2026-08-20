package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.OAuthLoginCode;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OAuthLoginCodeRepository
        extends JpaRepository<OAuthLoginCode, Long> {

    Optional<OAuthLoginCode>
    findByCodeAndUsedFalse(
            String code
    );
}