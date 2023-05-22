package com.backend.order.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
public class SuccessOrderDto {
    private String orderName; // 주문자
    private String orderDate;
    private String email;
    private String shipName; // 수령인
    private String shipAddress;
    private String shipTel;
    private String payMethod;
    private Integer shipCharge;
    private Integer orderPriceSum;
}
