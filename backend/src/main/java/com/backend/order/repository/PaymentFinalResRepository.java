package com.backend.order.repository;

import com.backend.order.entity.PaymentFinalRes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentFinalResRepository extends JpaRepository<PaymentFinalRes, String> {
}
