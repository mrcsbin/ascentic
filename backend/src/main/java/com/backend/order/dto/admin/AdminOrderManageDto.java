package com.backend.order.dto.admin;

import com.backend.order.entity.Order;
import com.backend.orderproduct.entity.OrderProduct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@Builder
public class AdminOrderManageDto {
    private String orderId; // 주문 id
    private String orderState; // 주문 상태
    private LocalDateTime orderDate; // 주문일
    private String orderPayment; // 결제수단
    private String orderPaymentInfo; // 결제 정보

    private String memberId; // 주문자 id
    private String orderName; // 주문자 이름
    private String orderEmail; // 주문자 이메일
    private String orderTel; // 주문자 연락처

    private String shipName; // 배송인 이름
    private String shipTel; // 배송지 연락처
    private String shipAddress; // 배송 주소
    private String shipMessage; // 배송 메시지
    private Integer shipCharge; // 배송비

    private String shipCode; // 송장번호

    private List<AdminOrderProdDto> orderProdDtoList; // 상품 정보

    public static AdminOrderManageDto of(Order order) {
        AdminOrderManageDto dto = AdminOrderManageDto.builder()
                .orderId(order.getOrderId())
                .orderState(order.getOrderState())
                .orderDate(order.getOrderDate())
                .orderPayment(order.getOrderPayment())
                .orderPaymentInfo(order.getOrderPaymentInfo())
                .memberId(order.getMemberId())
                .orderName(order.getOrderName())
                .orderEmail(order.getOrderEmail())
                .orderTel(order.getOrderTel())
                .shipName(order.getShipName())
                .shipTel(order.getShipTel())
                .shipAddress(order.getShipMainAddress() + order.getShipSubAddress())
                .shipMessage(order.getShipMessage())
                .shipCharge(order.getShipCharge())
                .shipCode(order.getShipCode() == null ? "" : order.getShipCode())
                .build();
        dto.setOrderProdDtoList(order.getOrderProducts());
        return dto;
    }

    private void setOrderProdDtoList(List<OrderProduct> orderProducts) {
        orderProdDtoList = orderProducts.stream()
                .map(AdminOrderProdDto::of)
                .collect(Collectors.toList());

    }
}
