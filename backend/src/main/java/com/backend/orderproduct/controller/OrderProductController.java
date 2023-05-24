package com.backend.orderproduct.controller;

import com.backend.orderproduct.dto.OrderListDto;
import com.backend.orderproduct.dto.OrderProductDto;
import com.backend.orderproduct.service.OrderProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class OrderProductController {
    private final OrderProductService orderProductService;

    @PostMapping("/finishorderprod")
    public void insertOrderProduct(@RequestBody OrderProductDto orderProductDTO) {
        orderProductService.insetOrderProduct(orderProductDTO);
    }

    @GetMapping("/orderproduct/getlist")
    public List<OrderListDto> getOrderList() {
        return orderProductService.getOrderList();
    }
}
