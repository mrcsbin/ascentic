package com.backend.payment.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentCancelRequestDto {
    private String cancelReason;

//    public PaymentCancelRequestDto() {
//    }
//
//    public PaymentCancelRequestDto(String cancelReason) {
//        this.cancelReason = cancelReason;
//    }
}