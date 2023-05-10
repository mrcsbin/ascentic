package com.backend.cart;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartDtoTest {
    private String prodImage;
    private String prodName;
    private String prodOption;
    private Integer cartNum;
    private Integer prodPrice;
}
