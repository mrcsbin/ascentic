package com.backend.orderproduct.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderProductDto {
    private String orderId;
    private Integer orderNum;
    private Integer optionNum;
    private Integer prodCount;
    private String orderState;


}
