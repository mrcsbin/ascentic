package com.backend.adminanalysis.service;

import com.backend.adminanalysis.dto.response.ProductSalesResponse;
import com.backend.adminanalysis.dto.response.ScentSalesResponse;

import java.util.List;

public interface AdminAnalysisService {

    List<ProductSalesResponse.SalesPerYearDto> getProductSalesPerYear();

    List<ProductSalesResponse.SalesPerMonthDto> getProductSalesPerMonth();

    List<ProductSalesResponse.SalesPerDayDto> getProductSalesPerDay();

    List<ScentSalesResponse.SalesPerYearDto> getScentSalesPerYear();

    List<ScentSalesResponse.SalesPerMonthDto> getScentSalesPerMonth();

    List<ScentSalesResponse.SalesPerDayDto> getScentSalesPerDay();
}
