package com.backend.orderproduct.service;

import com.backend.orderproduct.dto.OrderListDto;
import com.backend.orderproduct.dto.OrderProductDto;

import java.util.List;

public interface OrderProductService {
    void insetOrderProduct(OrderProductDto orderProductDTO);

    List<OrderListDto> getOrderList();
}
