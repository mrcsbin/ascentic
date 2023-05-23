package com.backend.product.dto;

import com.backend.scent.entity.Scent;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ProductDetailDto {
    private Integer prodNum;
    private String prodName;
    private String prodCategory;
    private String prodInfo;
    private List<Integer> prodPrice;
    private List<String> prodOption;
    private List<String> prodImage;
    private Scent scent;
    private boolean isWish;
}
