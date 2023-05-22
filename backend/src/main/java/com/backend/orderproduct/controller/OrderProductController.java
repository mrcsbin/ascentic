package com.backend.orderproduct.controller;

import com.backend.orderproduct.dto.OrderProductDTO;
import com.backend.orderproduct.service.OrderProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class OrderProductController {
    private final OrderProductService orderProductService;

    @PostMapping("/finishorderprod")
    public void insertOrderProduct(@RequestBody OrderProductDTO orderProductDTO) {
        orderProductService.insetOrderProduct(orderProductDTO);
    }
}
