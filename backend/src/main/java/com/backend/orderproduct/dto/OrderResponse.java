package com.backend.orderproduct.dto;

import com.backend.orderproduct.entity.OrderProduct;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

public class OrderResponse {

    @Getter
    @Builder
    public static class OrderListDto {
        private String productImage; // 상품 이미지
        private String productName; // 상품 이름
        private Integer productNum; // 상품 번호
        private String productOptionName; // 상품 옵션 이름
        private String orderDate; // 주문 날짜
        private Integer orderProductCount; // 주문 상품 수량
        private Integer orderProductPrice; // 주문 상품 가격
        private String orderShippingState; // 주문 발송 상태
        private Integer orderProductNumber; // 주문 상품 번호
        private Integer orderNum; // 주문 번호

        public static OrderListDto of(OrderProduct orderProduct) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy . MM . dd");
            String formattedDate = orderProduct.getOrder().getOrderDate().format(formatter);
            return new OrderListDto(
                    orderProduct.getProductOption().getProduct().getProductImages().get(0).getProdSaveName(),
                    orderProduct.getProductOption().getProduct().getProdName(),
                    orderProduct.getProductOption().getProduct().getProdNum(),
                    orderProduct.getProductOption().getProdOption(),
                    formattedDate,
                    orderProduct.getProdCount(),
                    orderProduct.getProductOption().getProdPrice(),
                    orderProduct.getOrderState(),
                    orderProduct.getOrderProdNum(),
                    orderProduct.getOrder().getOrderNum()
            );
        }
    }
}
