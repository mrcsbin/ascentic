package com.backend.wish.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WishListDto {
    private Integer productNum;
    private String productName;
    private String productImage;
}
