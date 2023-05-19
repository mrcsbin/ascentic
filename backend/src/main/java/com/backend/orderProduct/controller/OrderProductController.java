package com.backend.orderProduct.controller;

import com.backend.orderProduct.dto.OrderProductDTO;
import com.backend.orderProduct.service.OrderProductService;
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
