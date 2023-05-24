package com.backend.wish.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WishListDto {
    private Integer prodNum;
    private String prodName;
    private String prodImage;
}
