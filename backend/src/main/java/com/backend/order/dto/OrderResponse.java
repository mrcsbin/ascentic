package com.backend.order.dto;


import com.backend.order.entity.Card;
import com.backend.order.entity.EasyPay;
import com.backend.order.entity.Failure;
import com.backend.order.entity.Order;
import com.backend.orderproduct.entity.OrderProduct;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class OrderResponse {

    @Getter
    @Builder
    public static class OrderListDto {
        private String orderDate; // 주문 날짜
        private String orderId; // 주문 번호
        private List<OrderResponse.OrderProductDto> orderProductList; // 주문 상품 리스트

        public static OrderResponse.OrderListDto of(Order order, List<OrderResponse.OrderProductDto> orderProductList) {
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
        private String productName; // 상품 이름
        private Integer productNum; // 상품 번호(PK)
        private String productImage;// 상품 이미지
        private String productOptionName; // 주문 상품 옵션 이름
        private Integer orderProductPrice; // 주문 상품 가격
        private Integer orderProductCount; // 주문 상품 수량
        private String orderProductReviewState; // 주문 상품 리뷰 상태
        private String orderProductState; // 주문 상품 발송 상태
        private Integer orderProductNum; // 주문 상품 번호(PK)

        public static OrderResponse.OrderProductDto of(OrderProduct orderProduct) {
            return new OrderResponse.OrderProductDto(
                    orderProduct.getProductOption().getProduct().getProdName(),
                    orderProduct.getProductOption().getProduct().getProdNum(),
                    orderProduct.getProductOption().getProduct().getProductImages().get(0).getProdSaveName(),
                    orderProduct.getProductOption().getProdOption(),
                    orderProduct.getProductOption().getProdPrice(),
                    orderProduct.getProdCount(),
                    orderProduct.getOrderReviewState(),
                    orderProduct.getOrderState(),
                    orderProduct.getOrderProdNum());
        }
    }

    @Getter
    @Builder
    public static class MyPageProfileOrderListDto {
        private Integer orderProductCount; // 주문 상품 개수
        private Integer orderAmount; // 주문 금액
        private String orderId; // 주문 번호
        private String productImage; // 주문 상품 이미지
        private String productName; // 주문 상품 이름
        private String orderState; // 주문 상태

        public static OrderResponse.MyPageProfileOrderListDto of(Order order, Integer orderProductCount) {
            return new MyPageProfileOrderListDto(
                    orderProductCount,
                    order.getOrderPriceSum(),
                    order.getOrderId(),
                    order.getOrderProducts().get(0).getProductOption().getProduct().getProductImages().get(0).getProdSaveName(),
                    order.getOrderProducts().get(0).getProductOption().getProduct().getProdName(),
                    order.getOrderState());
        }
    }

    @Builder
    @Getter
    public static class SuccessOrderDto {
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
        public static SuccessOrderDto of(Order order, Failure failure, Card card, EasyPay easyPay) {
            return new SuccessOrderDto(
                    order.getOrderName(),
                    order.getOrderId(),
                    order.getOrderDate(),
                    order.getOrderEmail(),
                    order.getOrderName(),
                    order.getShipMainAddress(),
                    order.getShipSubAddress(),
                    order.getShipTel(),
                    order.getShipCharge(),
                    order.getOrderPriceSum(),
                    order.getOrderProducts().get(0).getProductOption().getProduct().getProdName(),
                    order.getOrderProducts().size(),
                    order.getOrderState(),
                    failure,
                    card,
                    easyPay
            );
        }
    }
}
