package com.backend.adminanalysis.controller;

import com.backend.adminanalysis.dto.response.ProductSalesResponse;
import com.backend.adminanalysis.dto.response.ScentSalesResponse;
import com.backend.adminanalysis.service.AdminAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/analysis")
@RequiredArgsConstructor
public class AdminAnalysisController {

    private final AdminAnalysisService adminAnalysisService;

    @GetMapping("/sales/year")
    public List<ProductSalesResponse.SalesPerYearDto> getProductSalesPerYear() {
        return adminAnalysisService.getProductSalesPerYear();
    }

    @GetMapping("/product/month")
    public List<ProductSalesResponse.SalesPerMonthDto> getProductSalesPerMonth() {
        return adminAnalysisService.getProductSalesPerMonth();
    }

    @GetMapping("/product/day")
    public List<ProductSalesResponse.SalesPerDayDto> getProductSalesPerDay() {
        return adminAnalysisService.getProductSalesPerDay();
    }

    @GetMapping("/scent/year")
    public List<ScentSalesResponse.SalesPerYearDto> getScentSalesPerYear() {
        return adminAnalysisService.getScentSalesPerYear();
    }

    @GetMapping("/scent/month")
    public List<ScentSalesResponse.SalesPerMonthDto> getScentSalesPerMonth() {
        return adminAnalysisService.getScentSalesPerMonth();
    }

    @GetMapping("/scent/day")
    public List<ScentSalesResponse.SalesPerDayDto> getScentSalesPerDay() {
        return adminAnalysisService.getScentSalesPerDay();
    }
}
