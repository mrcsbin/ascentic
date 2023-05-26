package com.backend.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRes {
    private String payment;
    private Integer amount;
    private String orderName;
    private String orderId;
    private String customerName;
    private String successUrl;
    private String failUrl;
    private String createDate;
    private String paySuccssYn;
    private Integer orderNum;
}
