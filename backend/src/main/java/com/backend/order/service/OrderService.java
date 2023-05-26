package com.backend.order.service;

import com.backend.order.dto.*;
import com.backend.order.entity.PaymentFinalRes;

public interface OrderService {
    PaymentRes insertOrder(OrderDTO orderDTO);

    AddressDTO getRecentAddr();

//    SuccessOrderDto getSuccessOrderInfo(Integer orderNum);

    void verifyRequest(String paymentKey, String orderId, Integer amount);

    PaymentFinalRes requestFinalPayment(String tossPaymentKey, String orderId, Integer amount);

    void saveRes(PaymentFinalRes result);
}
