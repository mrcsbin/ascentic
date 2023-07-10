package com.backend.payment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class PaymentCancelRequest {

    @Getter
    public static class OrderCancelDto {
        private String cancelReason;
        private String orderId;
    }

    @Getter
    @Setter
    public static class OrderProductCancelDto {
        private Integer cancelAmount;
        private String cancelReason;
        private String orderId;
        private Integer orderProductNum;
    }
}
