package com.backend.order;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/finishorder")// 상품 주문 API
    public Order insertOrder(@RequestParam("memberId") String memberId, Order order) {
        return orderService.insertOrder(memberId, order);
    }

    @PostMapping("/recentaddr") // 최근 배송지 가져오기
    public AddressDTO getRecentAddr(@RequestParam("memberId") String memberId) {
        return orderService.getRecentAddr(memberId);
    }
}
