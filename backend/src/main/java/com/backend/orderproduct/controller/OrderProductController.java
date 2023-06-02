package com.backend.orderproduct.controller;

import com.backend.orderproduct.dto.OrderProductRequest;
import com.backend.orderproduct.dto.OrderProductResponse;
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
    public void insertOrderProduct(@RequestBody OrderProductRequest.OrderProductDto orderProductDto) {
        orderProductService.insertOrderProduct(orderProductDto);
    }

    @GetMapping("/orderproduct/get/product")
    public List<OrderProductResponse.OrderProductListDto> getOrderProductList() {
        return orderProductService.getOrderProductList();
    }

    @GetMapping("/orderproduct/get/review")
    public List<OrderProductResponse.OrderReviewListDto> getOrderReviewList() {
        return orderProductService.getOrderReviewList();
    }
}
