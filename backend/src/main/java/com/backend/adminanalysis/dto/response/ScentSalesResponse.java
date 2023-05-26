package com.backend.adminanalysis.dto.response;

import com.backend.orderproduct.entity.OrderProduct;
import lombok.Builder;
import lombok.Getter;

public class ScentSalesResponse {

    @Getter
    @Builder
    public static class SalesPerYearDto {
        public static ScentSalesResponse.SalesPerYearDto of(OrderProduct orderProduct) {
            return new ScentSalesResponse.SalesPerYearDto(
                    String.valueOf(orderProduct.getOrder().getOrderDate()).substring(0, 4),
                    orderProduct.getOrder().getOrderPriceSum(),
                    orderProduct.getProductOption().getProduct().getScent().getScentNoteName());
        }

        private String year; // 년
        private Integer salesAmount; // 판매액
        private String productScent; // 향 이름
    }

    @Getter
    @Builder
    public static class SalesPerMonthDto {
        public static ScentSalesResponse.SalesPerMonthDto of(OrderProduct orderProduct) {
            return new ScentSalesResponse.SalesPerMonthDto(
                    String.valueOf(orderProduct.getOrder().getOrderDate()).substring(5, 7),
                    orderProduct.getOrder().getOrderPriceSum(),
                    orderProduct.getProductOption().getProduct().getScent().getScentNoteName());
        }

        private String month; // 월
        private Integer salesAmount; // 판매액
        private String productScent; // 향 이름
    }

    @Getter
    @Builder
    public static class SalesPerDayDto {
        public static ScentSalesResponse.SalesPerDayDto of(OrderProduct orderProduct) {
            return new ScentSalesResponse.SalesPerDayDto(
                    String.valueOf(orderProduct.getOrder().getOrderDate()).substring(8, 10),
                    orderProduct.getOrder().getOrderPriceSum(),
                    orderProduct.getProductOption().getProduct().getScent().getScentNoteName());
        }

        private String day; // 일
        private Integer salesAmount; // 판매액
        private String productScent; // 향 이름
    }
}
