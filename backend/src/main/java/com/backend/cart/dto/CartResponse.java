package com.backend.cart.dto;

import com.backend.cart.entity.Cart;
import lombok.Builder;
import lombok.Getter;

public class CartResponse {

    @Getter
    @Builder
    public static class GetCartDto {
        public static GetCartDto of(Cart cart) {
            return GetCartDto.builder()
                    .cartNum(cart.getCartNum())
                    .productNum(cart.getProductOption().getProduct().getProdNum())
                    .productName(cart.getProductOption().getProduct().getProdName())
                    .productPrice(cart.getProductOption().getProdPrice())
                    .productCount(cart.getProdCount())
                    .productImage(cart.getProductOption().getProduct().getProductImages().get(0).getProdSaveName())
                    .productOptionNum(cart.getProductOption().getOptionNum())
                    .productOptionName(cart.getProductOption().getProdOption())
                    .optionState(cart.getProductOption().getOptionState())
                    .build();
        }

        private Integer cartNum;
        private Integer productNum;
        private String productName;
        private Integer productPrice;
        private Integer productCount;
        private String productImage;
        private Integer productOptionNum;
        private String productOptionName;
        private String optionState;
    }
}
