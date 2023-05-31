package com.backend.payment.repository;

import com.backend.order.dto.Card;
import com.backend.payment.entity.SubscribePayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscribePaymentRepository extends JpaRepository<SubscribePayment, Integer> {
    SubscribePayment findByCustomerKey(String CustomerKey);
}
