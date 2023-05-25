package com.backend.cart.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetCartDto {
    private String prodImage;
    private String prodName;
    private String prodOption;
    private Integer cartNum;
    private Integer prodPrice;
    private Integer prodCount;
    private Integer prodOptionNum;
    private Integer prodNum;
}
