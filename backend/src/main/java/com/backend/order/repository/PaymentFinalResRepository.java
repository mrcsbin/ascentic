package com.backend.order.repository;

import com.backend.order.entity.Order;
import com.backend.order.entity.PaymentFinalRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentFinalResRepository extends JpaRepository<PaymentFinalRes, String> {
    PaymentFinalRes findByOrderId(String orderId);
}
