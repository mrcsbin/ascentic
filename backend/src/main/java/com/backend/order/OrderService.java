package com.backend.order;

public interface OrderService {
    Order insertOrder(String memberId, Order order);
    AddressDTO getRecentAddr(String memberId);
}
