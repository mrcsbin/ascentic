package com.backend.payment.repository;

import com.backend.payment.entity.SubscribePaymentReceipt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscribePaymentReceiptRepository extends JpaRepository<SubscribePaymentReceipt, Integer> {
    SubscribePaymentReceipt findByOrderId(String orderId);
}
