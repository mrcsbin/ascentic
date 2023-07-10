package com.backend.order.dto.admin;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AdminOrderUpdateDto {
    private String orderId;
    private String orderState;
    private String shipMainAddress;
    private String shipSubAddress;
    private String shipTel;
    private String shipCode;
    private String shipMessage;
    private String shipName;
}
