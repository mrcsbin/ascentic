package com.backend.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private String memberId;
    private String orderEmail;
    private String orderName;
    private String orderTel;
    private String shipName;
    private String shipTel;
    private String shipMainAddress;
    private String shipSubAddress;
    private String shipMessage;
    private String orderPayment;
    private String orderPaymentInfo;
    private Boolean orderPaymentState;
    private String orderState;
}
