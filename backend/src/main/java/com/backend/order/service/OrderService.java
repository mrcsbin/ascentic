package com.backend.order.service;

import com.backend.order.dto.AddressDTO;
import com.backend.order.dto.OrderDTO;
import com.backend.order.dto.SuccessOrderDto;

public interface OrderService {
    Integer insertOrder(OrderDTO orderDTO);

    AddressDTO getRecentAddr();

    SuccessOrderDto getSuccessOrderInfo(Integer orderNum);
}
