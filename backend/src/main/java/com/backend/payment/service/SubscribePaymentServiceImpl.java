package com.backend.payment.service;

import com.backend.payment.entity.SubscribePayment;
import com.backend.payment.repository.SubscribePaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SubscribePaymentServiceImpl implements SubscribePaymentService{
    SubscribePaymentRepository subscribePaymentRepository;
    public void insertSubscribePayment(SubscribePayment subscribePayment){
        subscribePaymentRepository.save(subscribePayment);
    }
}
