package com.backend.orderproduct.dto;

import com.backend.order.entity.Order;
import com.backend.orderproduct.entity.OrderProduct;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class OrderProductResponse {

    @Getter
    @Builder
    public static class OrderProductListDto {
        private String productImage; // 상품 이미지
        private String productName; // 상품 이름
        private Integer productNum; // 상품 번호(PK)
        private String productOptionName; // 상품 옵션 이름
        private String orderDate; // 주문 날짜
        private String orderId; // 주문 번호
        private Integer orderProductPrice; // 주문 상품 가격
        private Integer orderProductCount; // 주문 상품 수량
        private String orderShippingState; // 주문 발송 상태
        private Integer orderProductNum; // 주문 상품 번호(PK)

        public static OrderProductListDto of(OrderProduct orderProduct) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy . MM . dd");
            String formattedDate = orderProduct.getOrder().getOrderDate().format(formatter);
            return new OrderProductListDto(
                    orderProduct.getProductOption().getProduct().getProductImages().get(0).getProdSaveName(),
                    orderProduct.getProductOption().getProduct().getProdName(),
                    orderProduct.getProductOption().getProduct().getProdNum(),
                    orderProduct.getProductOption().getProdOption(),
                    formattedDate,
                    orderProduct.getOrder().getOrderId(),
                    orderProduct.getProductOption().getProdPrice(),
                    orderProduct.getProdCount(),
                    orderProduct.getOrderState(),
                    orderProduct.getOrderProdNum()
            );
        }
    }

    @Getter
    @Builder
    public static class OrderReviewListDto {
        private String productImage; // 상품 이미지
        private String productName; // 상품 이름
        private Integer productNum; // 상품 번호(PK)
        private String productOptionName; // 상품 옵션 이름
        private String orderId; // 주문 번호
        private String orderDate; // 주문 날짜
        private Integer orderProductPrice; // 주문 상품 가격
        private Integer orderProductCount; // 주문 상품 수량
        private Integer orderProductNum; // 주문 상품 번호(PK)
        private String orderProductReviewState; // 주문 상품 리뷰 상태


        public static OrderReviewListDto of(OrderProduct orderProduct) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy . MM . dd");
            String formattedDate = orderProduct.getOrder().getOrderDate().format(formatter);

            return new OrderReviewListDto(
                    orderProduct.getProductOption().getProduct().getProductImages().get(0).getProdSaveName(),
                    orderProduct.getProductOption().getProduct().getProdName(),
                    orderProduct.getProductOption().getProduct().getProdNum(),
                    orderProduct.getProductOption().getProdOption(),
                    orderProduct.getOrder().getOrderId(),
                    formattedDate,
                    orderProduct.getProductOption().getProdPrice(),
                    orderProduct.getProdCount(),
                    orderProduct.getOrderProdNum(),
                    orderProduct.getOrderReviewState()
            );
        }
    }

}
