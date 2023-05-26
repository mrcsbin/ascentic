package com.backend.adminanalysis.dto.response;

import com.backend.orderproduct.entity.OrderProduct;
import lombok.Builder;
import lombok.Getter;

public class ProductSalesResponse {

    @Getter
    @Builder
    public static class SalesPerYearDto {
        public static SalesPerYearDto of(OrderProduct orderProduct) {
            return new SalesPerYearDto(
                    String.valueOf(orderProduct.getOrder().getOrderDate()).substring(0, 4),
                    orderProduct.getOrder().getOrderPriceSum(),
                    orderProduct.getProductOption().getProduct().getProdCategory());
        }

        private String year; // 년
        private Integer salesAmount; // 판매액
        private String productCategory; // 상품 카테고리
    }

    @Getter
    @Builder
    public static class SalesPerMonthDto {
        public static SalesPerMonthDto of(OrderProduct orderProduct) {
            return new SalesPerMonthDto(
                    String.valueOf(orderProduct.getOrder().getOrderDate()).substring(5, 7),
                    orderProduct.getOrder().getOrderPriceSum(),
                    orderProduct.getProductOption().getProduct().getProdCategory());
        }

        private String month; // 월
        private Integer salesAmount; // 판매액
        private String productCategory; // 상품 카테고리
    }

    @Getter
    @Builder
    public static class SalesPerDayDto {
        public static SalesPerDayDto of(OrderProduct orderProduct) {
            return new SalesPerDayDto(
                    String.valueOf(orderProduct.getOrder().getOrderDate()).substring(8, 10),
                    orderProduct.getOrder().getOrderPriceSum(),
                    orderProduct.getProductOption().getProduct().getProdCategory());
        }

        private String day; // 일
        private Integer salesAmount; // 판매액
        private String productCategory; // 상품 카테고리
    }
}
