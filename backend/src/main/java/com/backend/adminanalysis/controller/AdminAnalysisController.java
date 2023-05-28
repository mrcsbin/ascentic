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

    // 상품 타입에 따른 년, 월, 일별 상품 판매량
    @GetMapping("/sales/{type}")
    public List<Map<String, Object>> getSalesAmountByDateTypeAndProductType(@PathVariable String type, String dateType) {
        return adminAnalysisService.getSalesAmountByDateTypeAndProductType(type, dateType);
    }

    // 년, 월, 일별 전체 상품 판매량
    @GetMapping("/sales/all")
    public List<Map<String, Integer>> getAmountSales(String dateType) {
        return adminAnalysisService.getAmountSales(dateType);
    }

    // 지난 30일, 60일 동안의 회원가입자 수 추이
    @GetMapping("/member")
    public List<Map<String, Object>> getMembershipTrend(Integer dateType) {
        return adminAnalysisService.getMembershipTrend(dateType);
    }

    // 전체 회원 수 대비 구독 회원 수
    @GetMapping("/subscribe")
    public List<Map<String, Object>> getSubscribeMemberPerMember() {
        return adminAnalysisService.getMemberPerSubscribeMember();
    }

    // 구독 상품별 평점
    @GetMapping("/subscribe/score")
    public List<Map<String,Object>> getSubscribeProductScores() {
        return adminAnalysisService.getSubscribeProductScores();
    }
}
