package com.backend.payment.repository;

import com.backend.payment.entity.SubscribePayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscribePaymentRepository extends JpaRepository<SubscribePayment, Integer> {
    SubscribePayment findByCustomerKey(String CustomerKey);

//    SubscribePayment findByMemberId(String memberId);
    SubscribePayment findFirstByMemberIdOrderBySubscribePaymentNumDesc(String memberId);


}

