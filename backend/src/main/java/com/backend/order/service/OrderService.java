package com.backend.order.service;

import com.backend.order.dto.*;

public interface OrderService {
    PaymentRes insertOrder(OrderDTO orderDTO);

    AddressDTO getRecentAddr();

    SuccessOrderDto getSuccessOrderInfo(Integer orderNum);
}
