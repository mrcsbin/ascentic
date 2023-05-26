package com.backend.order.dto;

import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
public class SuccessOrderDto {
    private String orderName; // 주문자
    private LocalDateTime orderDate;
    private String email;
    private String shipName; // 수령인
    private String shipAddress;
    private String shipTel;
    private Card payMethod;
    private Integer shipCharge;
    private Integer orderPriceSum;
    private String prodNames;
    private String orderState;
    }
