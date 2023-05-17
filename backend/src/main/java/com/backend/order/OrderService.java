package com.backend.order;

public interface OrderService {
    Integer insertOrder(OrderDTO orderDTO);

    AddressDTO getRecentAddr();

    MemberInfoDto getMemberInfo();
}
