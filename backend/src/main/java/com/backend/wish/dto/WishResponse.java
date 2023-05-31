package com.backend.wish.dto;

import com.backend.wish.entity.Wish;
import lombok.Builder;
import lombok.Getter;

public class WishResponse {

    @Getter
    @Builder
    public static class WishListDto {
        public static WishListDto of(Wish wish) {
            return WishListDto.builder()
                    .productNum(wish.getProduct().getProdNum())
                    .productName(wish.getProduct().getProdName())
                    .productImage(wish.getProduct().getProductImages().get(0).getProdSaveName())
                    .build();
        }

        private Integer productNum;
        private String productName;
        private String productImage;
    }
}
