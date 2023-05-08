package com.backend.order;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/finishorder")// 상품 주문 API
    public int insertOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.insertOrder(orderDTO);
    }

    @PostMapping("/recentaddr") // 최근 배송지 가져오기
    public AddressDTO getRecentAddr(@RequestBody AddressDTO addressDTO) {
        return orderService.getRecentAddr(addressDTO.getMemberId());
    }
}
