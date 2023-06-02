package com.backend.orderproduct.service;

import com.backend.orderproduct.dto.OrderProductRequest;
import com.backend.orderproduct.dto.OrderProductResponse;

import java.util.List;

public interface OrderProductService {

    void insertOrderProduct(OrderProductRequest.OrderProductDto orderProductDto);

    List<OrderProductResponse.OrderProductListDto> getOrderProductList();

    List<OrderProductResponse.OrderReviewListDto> getOrderReviewList();
}
