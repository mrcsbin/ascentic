package com.backend.adminanalysis.service;

import com.backend.adminanalysis.dto.response.ProductSalesResponse;
import com.backend.adminanalysis.dto.response.ScentSalesResponse;
import com.backend.orderproduct.repository.OrderProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminAnalysisServiceImpl implements AdminAnalysisService {

    private final OrderProductRepository orderProductRepository;

    @Override
    public List<ProductSalesResponse.SalesPerYearDto> getProductSalesPerYear() {
        return orderProductRepository.findAll().stream()
                .map(orderProduct -> {
                    return ProductSalesResponse.SalesPerYearDto.of(orderProduct);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductSalesResponse.SalesPerMonthDto> getProductSalesPerMonth() {
        return orderProductRepository.findAll().stream()
                .map(orderProduct -> {
                    return ProductSalesResponse.SalesPerMonthDto.of(orderProduct);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductSalesResponse.SalesPerDayDto> getProductSalesPerDay() {
        return orderProductRepository.findAll().stream()
                .map(orderProduct -> {
                    return ProductSalesResponse.SalesPerDayDto.of(orderProduct);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ScentSalesResponse.SalesPerYearDto> getScentSalesPerYear() {
        return orderProductRepository.findAll().stream()
                .map(orderProduct -> {
                    return ScentSalesResponse.SalesPerYearDto.of(orderProduct);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ScentSalesResponse.SalesPerMonthDto> getScentSalesPerMonth() {
        return orderProductRepository.findAll().stream()
                .map(orderProduct -> {
                    return ScentSalesResponse.SalesPerMonthDto.of(orderProduct);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ScentSalesResponse.SalesPerDayDto> getScentSalesPerDay() {
        return orderProductRepository.findAll().stream()
                .map(orderProduct -> {
                    return ScentSalesResponse.SalesPerDayDto.of(orderProduct);
                })
                .collect(Collectors.toList());
    }
}
