package com.backend.payment.controller;

import com.backend.order.repository.PaymentFinalResRepository;
import com.backend.payment.dto.PaymentCancelRequest;
import com.backend.payment.dto.PaymentCancelRequestDto;
import com.backend.payment.repository.SubscribePaymentReceiptRepository;
import com.backend.payment.service.PaymentCancelServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaymentCancelController {

    private final PaymentFinalResRepository paymentFinalResRepository;
    private final SubscribePaymentReceiptRepository subscribePaymentReceiptRepository;
    private final PaymentCancelServiceImpl paymentCancelService;

    @PostMapping("/cancelOrderPayment")
    public String cancelPayment(@RequestBody PaymentCancelRequestDto request) {
        String cancelResult = paymentCancelService.cancelPayment(request);
        return cancelResult;
    }

    @PostMapping("/order/cancel/orderproduct")
    public String cancelOrderProduct(@RequestBody PaymentCancelRequest.OrderProductCancelDto request) {
        return paymentCancelService.cancelOrderProduct(request);
    }


}
