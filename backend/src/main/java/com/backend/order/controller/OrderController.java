package com.backend.order.controller;

import com.backend.order.dto.AddressDTO;
import com.backend.order.dto.OrderDTO;
import com.backend.order.dto.SuccessOrderDto;
import com.backend.order.service.OrderService;
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

    @GetMapping("/recentaddr") // 최근 배송지 가져오기
    public AddressDTO getRecentAddr() {
        return orderService.getRecentAddr();
    }

    @GetMapping("/successorder") // 결제 완료 정보 조회
    public SuccessOrderDto getSuccessOrderInfo(@RequestParam Integer orderNum) {
        return orderService.getSuccessOrderInfo(orderNum);
    }

}
