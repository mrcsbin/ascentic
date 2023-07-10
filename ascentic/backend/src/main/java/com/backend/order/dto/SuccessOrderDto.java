package com.backend.order.dto;

import com.backend.order.entity.Card;
import com.backend.order.entity.EasyPay;
import com.backend.order.entity.Failure;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class SuccessOrderDto {
    private String orderName; // 주문자
    private String orderId; //order Id
    private LocalDateTime orderDate; //구매 날짜
    private String email; //구메자 이메일
    private String shipName; // 수령인
    private String shipMainAddress; //수령인 배송지
    private String shipSubAddress; //수령인 배송지
    private String shipTel; //수령인 휴대전화
    private Integer shipCharge; //배송비
    private Integer orderPriceSum; //상품가격
    private String prodNames; //구매한 제품명
    private Integer totalProdCount; // 총 구매한 제품 개수
    private String orderState; //결제 상태
    private Failure failure; //결제 실패시
    private Card card; //결제수단
    private EasyPay easyPay; //토스 or 카카오페이 등
    }

