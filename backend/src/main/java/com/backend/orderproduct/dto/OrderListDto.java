package com.backend.orderproduct.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class OrderListDto {
    private String productImage; // 상품 이미지
    private String productName; // 상품 이름
    private String productOptionName; // 상품 옵션 이름
    private Integer productNum; // 상품 번호
    private String orderDate; // 주문 날짜
    private Integer orderProductQuantity; // 주문 상품 수량
    private Integer orderProductPrice; // 주문 상품 가격
    private boolean orderShippingState; // 주문 발송 상태
    private Integer orderProductNumber; // 주문 상품 번호
}
