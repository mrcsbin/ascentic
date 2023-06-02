package com.backend.orderproduct.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderProductRequest {

    @Getter
    public static class OrderProductDto {
        private String orderId;
        private Integer orderNum;
        private Integer optionNum;
        private Integer prodCount;
        private String orderState;
    }
}
