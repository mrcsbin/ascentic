package com.backend.cart.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartRequest {

    @Getter
    public static class AddCartDto {
        private Integer productCount;
        private String productOptionName;
        private Integer productOptionNum;
    }

    @Getter
    public static class UpdateCartDto {
        private Integer cartNum;
        private Integer productCount;
    }
}
