package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.IncomeRequest;
import com.paisatrack.backend.dto.IncomeResponse;

import java.util.List;

public interface IncomeService {

    IncomeResponse addIncome(IncomeRequest request);

    List<IncomeResponse> getAllIncome(String month);

    IncomeResponse getIncomeById(Long id);

    IncomeResponse updateIncome(Long id, IncomeRequest request);

    void deleteIncome(Long id);
}