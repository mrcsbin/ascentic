package com.backend.product.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProductListDto {
    private Integer prodNum;
    private String prodName;
    private String prodInfo;
    private Integer prodWishCount;
    private Integer prodReadCount;
    private String prodCategory;
    private String prodImage;
    private Integer prodPrice;
}
