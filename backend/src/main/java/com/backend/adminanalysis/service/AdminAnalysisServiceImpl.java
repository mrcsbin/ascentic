package com.backend.adminanalysis.service;

import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.repository.OrderProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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


}
