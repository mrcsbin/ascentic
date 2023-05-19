package com.backend.order.service;

import com.backend.order.dto.AddressDTO;
import com.backend.order.dto.MemberInfoDto;
import com.backend.order.dto.OrderDTO;

public interface OrderService {
    Integer insertOrder(OrderDTO orderDTO);

    AddressDTO getRecentAddr();

    MemberInfoDto getMemberInfo();
}
