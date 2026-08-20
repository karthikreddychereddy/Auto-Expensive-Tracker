package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.EmailVerificationOtp;
import com.paisatrack.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailVerificationOtpRepository
        extends JpaRepository<
                EmailVerificationOtp,
                Long
        > {

    Optional<EmailVerificationOtp>
    findTopByUserAndUsedFalseOrderByCreatedAtDesc(
            User user
    );

    void deleteByUser(
            User user
    );
}