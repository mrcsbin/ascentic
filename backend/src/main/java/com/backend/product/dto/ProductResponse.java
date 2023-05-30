package com.backend.product.dto;

import com.backend.product.entity.Product;
import com.backend.productoption.entity.ProductOption;
import com.backend.reviewcomment.entity.ReviewComment;
import com.backend.scent.entity.Scent;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class ProductResponse {

    @Builder
    @Getter
    public static class ProductListDto {
        private Integer prodNum;
        private String prodName;
        private String prodInfo;
        private Integer prodWishCount;
        private Integer prodReadCount;
        private String prodCategory;
        private String prodImage;
        private Integer prodPrice;
    }

    @Getter
    @Builder
    public static class ProductDetailDto {
        private Integer prodNum;
        private String prodName;
        private String prodCategory;
        private String prodInfo;
        private List<Integer> prodPrice;
        private List<String> prodOption;
        private List<String> prodImage;
        private Scent scent;
        private boolean isWish;
        private List<Review> reviewList;
        private List<Integer> prodOptionNum;
    }

    @Getter
    @Builder
    public static class ProductSearchDto {
        public static ProductSearchDto of(Product product) {
            return ProductSearchDto.builder()
                    .productCategory(product.getProdCategory())
                    .productName(product.getProdName())
                    .productNum(product.getProdNum())
                    .productPrice(product.getProductOption().get(0).getProdPrice())
                    .productImage(product.getProductImages().get(0).getProdSaveName())
                    .productInfo(product.getProdInfo())
                    .productWishCount(product.getProdWishCount())
                    .build();
        }

        private String productCategory;
        private String productName;
        private Integer productNum;
        private Integer productPrice;
        private String productImage;
        private String productInfo;
        private Integer productWishCount;
    }

    @Getter
    @Builder
    public static class RecommendProductDto {
        public static RecommendProductDto of(Product product) {
            return RecommendProductDto.builder()
                    .productImage(product.getProductImages().get(0).getProdSaveName())
                    .productNum(product.getProdNum())
                    .productPrice(product.getProdPriceList().get(0))
                    .productName(product.getProdName())
                    .build();
        }

        private String productImage;
        private Integer productNum;
        private Integer productPrice;
        private String productName;
    }

    @Getter
    @Builder
    public static class Review {
        private String memberId;
        private String reviewContent;
        private LocalDateTime reviewDate;
        private Integer reviewScore;
        private List<ReviewComment> reviewCommentList;
    }
}
