package com.backend.orderProduct;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderProductDTO {
    private Integer orderId;
    private Integer optionNum;
    private Integer prodCount;
    private boolean orderState;


}
