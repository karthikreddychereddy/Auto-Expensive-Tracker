package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.SavingsRequest;
import com.paisatrack.backend.dto.SavingsResponse;

import com.paisatrack.backend.entity.Savings;
import com.paisatrack.backend.entity.User;

import com.paisatrack.backend.repository.SavingsRepository;
import com.paisatrack.backend.repository.UserRepository;

import com.paisatrack.backend.service.SavingsService;

import com.paisatrack.backend.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;

import java.time.format.DateTimeParseException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingsServiceImpl
        implements SavingsService {

        private final SavingsRepository
                savingsRepository;

        private final UserRepository
                userRepository;

        // ==========================================
        // CREATE
        // ==========================================

        @Override
        public SavingsResponse createSaving(
                SavingsRequest request
        ) {

                User user =
                        getCurrentUser();

                Savings saving =
                        Savings.builder()

                                .user(user)

                                .amount(
                                        request.getAmount()
                                )

                                .source(
                                        request.getSource()
                                )

                                .description(
                                        request.getDescription()
                                )

                                .savingDate(
                                        request.getSavingDate()
                                )

                                .build();

                Savings saved =
                        savingsRepository.save(
                                saving
                        );

                return mapSaving(
                        saved
                );
        }

        // ==========================================
        // GET SAVINGS
        // ==========================================

        @Override
        public List<SavingsResponse>
        getAllSavings(
                String month
        ) {

                User user =
                        getCurrentUser();

                List<Savings> savings =
                        savingsRepository
                                .findByUser(
                                        user
                                );

                /*
                * Keep compatibility if no month
                * is supplied.
                */
                if (
                        month == null ||
                        month.isBlank()
                ) {

                return savings
                        .stream()

                        .map(
                                this::mapSaving
                        )

                        .toList();
                }

                YearMonth selectedMonth =
                        parseMonth(
                                month
                        );

                LocalDate firstDay =
                        selectedMonth.atDay(
                                1
                        );

                LocalDate lastDay =
                        selectedMonth
                                .atEndOfMonth();

                return savings
                        .stream()

                        .filter(
                                saving -> {

                                LocalDate date =
                                        saving.getSavingDate();

                                return (
                                        date != null
                                        &&
                                        !date.isBefore(
                                                firstDay
                                        )
                                        &&
                                        !date.isAfter(
                                                lastDay
                                        )
                                );
                                }
                        )

                        .map(
                                this::mapSaving
                        )

                        .toList();
        }

        // ==========================================
        // GET BY ID
        // ==========================================

        @Override
        public SavingsResponse getSavingById(
                Long id
        ) {

                User user =
                        getCurrentUser();

                Savings saving =
                        savingsRepository
                                .findById(id)

                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Saving not found"
                                        )
                                );

                verifyOwnership(
                        saving,
                        user
                );

                return mapSaving(
                        saving
                );
        }

        // ==========================================
        // UPDATE
        // ==========================================

        @Override
        public SavingsResponse updateSaving(
                Long id,
                SavingsRequest request
        ) {

                User user =
                        getCurrentUser();

                Savings saving =
                        savingsRepository
                                .findById(id)

                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Saving not found"
                                        )
                                );

                verifyOwnership(
                        saving,
                        user
                );

                saving.setAmount(
                        request.getAmount()
                );

                saving.setSource(
                        request.getSource()
                );

                saving.setDescription(
                        request.getDescription()
                );

                saving.setSavingDate(
                        request.getSavingDate()
                );

                Savings updated =
                        savingsRepository.save(
                                saving
                        );

                return mapSaving(
                        updated
                );
        }

        // ==========================================
        // DELETE
        // ==========================================

        @Override
        public void deleteSaving(
                Long id
        ) {

                User user =
                        getCurrentUser();

                Savings saving =
                        savingsRepository
                                .findById(id)

                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Saving not found"
                                        )
                                );

                verifyOwnership(
                        saving,
                        user
                );

                savingsRepository.delete(
                        saving
                );
        }

        // ==========================================
        // CURRENT USER
        // ==========================================

        private User getCurrentUser() {

                String email =
                        SecurityUtil
                                .getCurrentUserEmail();

                return userRepository
                        .findByEmail(
                                email
                        )

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );
        }

        // ==========================================
        // OWNERSHIP
        // ==========================================

        private void verifyOwnership(
                Savings saving,
                User user
        ) {

                if (
                        saving.getUser() == null ||
                        !saving
                                .getUser()
                                .getId()
                                .equals(
                                        user.getId()
                                )
                ) {

                throw new RuntimeException(
                        "Unauthorized"
                );
                }
        }

        // ==========================================
        // PARSE YYYY-MM
        // ==========================================

        private YearMonth parseMonth(
                String month
        ) {

                try {

                return YearMonth.parse(
                        month
                );

                } catch (
                        DateTimeParseException exception
                ) {

                throw new RuntimeException(
                        "Invalid month. Expected format: YYYY-MM"
                );
                }
        }

        // ==========================================
        // MAP RESPONSE
        // ==========================================

        private SavingsResponse mapSaving(
                Savings saving
        ) {

                return SavingsResponse
                        .builder()

                        .id(
                                saving.getId()
                        )

                        .amount(
                                saving.getAmount()
                        )

                        .source(
                                saving.getSource()
                        )

                        .description(
                                saving.getDescription()
                        )

                        .savingDate(
                                saving.getSavingDate()
                        )

                        .build();
        }
}