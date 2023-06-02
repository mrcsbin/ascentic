package com.backend.orderproduct.service;

import com.backend.orderproduct.dto.OrderRequest;
import com.backend.orderproduct.dto.OrderResponse;

import java.util.List;

public interface OrderProductService {

    void insetOrderProduct(OrderRequest.OrderProductDto orderProductDto);

    List<OrderResponse.OrderListDto> getOrderList();
}
