package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.IncomeRequest;
import com.paisatrack.backend.dto.IncomeResponse;
import com.paisatrack.backend.entity.Income;
import com.paisatrack.backend.repository.IncomeRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.util.SecurityUtil;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    @Override
    public IncomeResponse addIncome(IncomeRequest request) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Income income = Income.builder()
                .user(user)
                .amount(request.getAmount())
                .category(request.getCategory())
                .source(request.getSource())
                .description(request.getDescription())
                .incomeDate(request.getIncomeDate())
                .build();

        Income savedIncome = incomeRepository.save(income);

        return IncomeResponse.builder()
                .id(savedIncome.getId())
                .amount(savedIncome.getAmount())
                .category(savedIncome.getCategory())
                .source(savedIncome.getSource())
                .description(savedIncome.getDescription())
                .incomeDate(savedIncome.getIncomeDate())
                .transactionType(savedIncome.getTransactionType())
                .build();
    }

    @Override
    public List<IncomeResponse> getAllIncome() {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Income> incomes = incomeRepository.findByUser(user);

        return incomes.stream()
                .map(income -> IncomeResponse.builder()
                        .id(income.getId())
                        .amount(income.getAmount())
                        .category(income.getCategory())
                        .source(income.getSource())
                        .description(income.getDescription())
                        .incomeDate(income.getIncomeDate())
                        .transactionType(income.getTransactionType())
                        .build())
                .toList();
    }

    @Override
    public IncomeResponse getIncomeById(Long id) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Income not found"));

        if (!income.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return IncomeResponse.builder()
                .id(income.getId())
                .amount(income.getAmount())
                .category(income.getCategory())
                .source(income.getSource())
                .description(income.getDescription())
                .incomeDate(income.getIncomeDate())
                .transactionType(income.getTransactionType())
                .build();
    }

    @Override
    public IncomeResponse updateIncome(Long id, IncomeRequest request) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Income not found"));

        if (!income.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        income.setAmount(request.getAmount());
        income.setCategory(request.getCategory());
        income.setSource(request.getSource());
        income.setDescription(request.getDescription());
        income.setIncomeDate(request.getIncomeDate());

        Income updatedIncome = incomeRepository.save(income);

        return IncomeResponse.builder()
                .id(updatedIncome.getId())
                .amount(updatedIncome.getAmount())
                .category(updatedIncome.getCategory())
                .source(updatedIncome.getSource())
                .description(updatedIncome.getDescription())
                .incomeDate(updatedIncome.getIncomeDate())
                .transactionType(updatedIncome.getTransactionType())
                .build();
    }

    @Override
    public void deleteIncome(Long id) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Income not found"));

        if (!income.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        incomeRepository.delete(income);
    }
}