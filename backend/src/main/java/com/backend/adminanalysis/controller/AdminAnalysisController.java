package com.backend.adminanalysis.controller;

import com.backend.adminanalysis.service.AdminAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/analysis")
@RequiredArgsConstructor
public class AdminAnalysisController {

    private final AdminAnalysisService adminAnalysisService;

    @GetMapping("/sales/{type}")
    public List<Map<String, Object>> getSalesAmountByDateTypeAndProductType(@PathVariable String type, String dateType) {
        return adminAnalysisService.getSalesAmountByDateTypeAndProductType(type, dateType);
    }

    @GetMapping("/sales/all")
    public List<Map<String, Integer>> getAmountSales(String dateType) {
        return adminAnalysisService.getAmountSales(dateType);
    }
}
