package com.backend.payment.service;

import com.backend.order.dto.OrderDTO;
import com.backend.order.dto.PaymentRes;
import com.backend.payment.entity.SubscribePayment;

public interface SubscribePaymentService {
    void insertSubscribePayment(SubscribePayment subscribePayment);
}
