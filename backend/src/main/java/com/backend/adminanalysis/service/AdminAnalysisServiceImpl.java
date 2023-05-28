package com.backend.adminanalysis.service;

import com.backend.member.entity.Member;
import com.backend.member.repository.MemberRepository;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.repository.OrderProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminAnalysisServiceImpl implements AdminAnalysisService {

    private final OrderProductRepository orderProductRepository;
    private final MemberRepository memberRepository;

    private Map<String, DateTimeFormatter> dateTypeMap = Map.of(
            "year", DateTimeFormatter.ofPattern("yyyy"),
            "month", DateTimeFormatter.ofPattern("MM"),
            "day", DateTimeFormatter.ofPattern("dd"));

    private Map<String, String> dateTypeLabels = Map.of(
            "year", "년",
            "month", "월",
            "day", "일");

    @Override
    public List<Map<String, Object>> getSalesAmountByDateTypeAndProductType(String type, String dateType) {
        List<Map<String, Object>> salesMap = new ArrayList<>();

        Function<OrderProduct, String> categoryExtractor;
        if (type.equals("category")) {
            categoryExtractor = orderProduct -> orderProduct.getProductOption().getProduct().getProdCategory();
        } else if (type.equals("scent")) {
            categoryExtractor = orderProduct -> orderProduct.getProductOption().getProduct().getScent().getScentNoteName();
        } else {
            throw new IllegalArgumentException("유효하지 않은 타입 선택");
        }

        Map<String, Map<String, Integer>> map = orderProductRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        orderProduct -> dateTypeMap.get(dateType).format(orderProduct.getOrder().getOrderDate()),
                        Collectors.groupingBy(
                                categoryExtractor,
                                Collectors.summingInt(orderProduct -> orderProduct.getOrder().getOrderPriceSum())
                        )
                ));

        map.forEach((key, categoryMap) -> {
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put(dateTypeLabels.get(dateType), key);
            categoryMap.forEach((productCategory, salesAmount) -> {
                resultMap.put(productCategory, salesAmount);
            });
            salesMap.add(resultMap);
        });

        return salesMap;
    }

    @Override
    public List<Map<String, Integer>> getAmountSales(String dateType) {
        Map<String, Integer> salesMap = new HashMap<>();

        List<Map.Entry<String, Integer>> sortedEntries = orderProductRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        orderProduct -> dateTypeMap.get(dateType).format(orderProduct.getOrder().getOrderDate()),
                        Collectors.summingInt(orderProduct -> orderProduct.getOrder().getOrderPriceSum())
                ))
                .entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .collect(Collectors.toList());

        return sortedEntries.stream()
                .map(entry -> {
                    salesMap.put(dateTypeLabels.get(dateType), Integer.parseInt(entry.getKey()));
                    salesMap.put("판매액", entry.getValue());
                    return new HashMap<>(salesMap);
                })
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getMembershipTrend(Integer dateType) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(dateType - 1); // 오늘로부터 30일 이전 날짜로 설정

        List<Member> members = memberRepository.findAll();
        Map<LocalDate, Long> signUpCountMap = members.stream()
                .filter(member -> {
                    LocalDate signUpDate = member.getMemberSignUpTime();
                    return !signUpDate.isBefore(startDate) && !signUpDate.isAfter(endDate);
                })
                .collect(Collectors.groupingBy(
                        member -> member.getMemberSignUpTime(),
                        Collectors.counting()
                ));

        List<LocalDate> dateRange = startDate.datesUntil(endDate.plusDays(1)).collect(Collectors.toList());

        List<Map<String, Object>> signUpCounts = dateRange.stream()
                .map(date -> {
                    Map<String, Object> dateCountMap = new HashMap<>();
                    dateCountMap.put("x", date);
                    dateCountMap.put("y", signUpCountMap.getOrDefault(date, 0L));
                    return dateCountMap;
                })
                .collect(Collectors.toList());

        return signUpCounts;
    }

}
