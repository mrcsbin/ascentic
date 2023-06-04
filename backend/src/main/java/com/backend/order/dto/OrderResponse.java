package com.backend.order.dto;

import com.backend.order.entity.Order;
import com.backend.orderproduct.entity.OrderProduct;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;
import java.util.List;

public class OrderResponse {

    @Getter
    @Builder
    public static class OrderListDto {
        private String orderDate; // 주문 날짜
        private String orderId; // 주문 번호
        private List<OrderResponse.OrderProductDto> orderProductList; // 주문 상품 리스트

        public static OrderResponse.OrderListDto of(Order order,  List<OrderResponse.OrderProductDto> orderProductList) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy . MM . dd");
            String formattedDate = order.getOrderDate().format(formatter);

            return new OrderListDto(
                    formattedDate,
                    order.getOrderId(),
                    orderProductList);
        }
    }

    @Getter
    @Builder
    public static class OrderProductDto {
        private String productName; // 주문 상품 이름
        private Integer productNum; // 주문 상품 번호(PK)
        private String productImage;// 주문 상품 이미지
        private String productOptionName; // 주문 상품 옵션 이름
        private Integer orderProductPrice; // 주문 상품 가격
        private Integer orderProductCount; // 주문 상품 수량
        private String orderProductReviewState; // 주문 상품 리뷰 상태
        private String orderProductState; // 주문 상품 발송 상태

        public static OrderResponse.OrderProductDto of(OrderProduct orderProduct) {
            return new OrderResponse.OrderProductDto(
                    orderProduct.getProductOption().getProduct().getProdName(),
                    orderProduct.getProductOption().getProduct().getProdNum(),
                    orderProduct.getProductOption().getProduct().getProductImages().get(0).getProdSaveName(),
                    orderProduct.getProductOption().getProdOption(),
                    orderProduct.getProductOption().getProdPrice(),
                    orderProduct.getProdCount(),
                    orderProduct.getOrderReviewState(),
                    orderProduct.getOrderState());
        }
    }
}
