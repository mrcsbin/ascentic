package com.backend.product.dto;

import com.backend.member.jwt.SecurityUtils;
import com.backend.product.entity.Product;
import com.backend.productoption.entity.ProductOption;
import com.backend.review.entity.Review;
import com.backend.reviewcomment.entity.ReviewComment;
import com.backend.scent.entity.Scent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

public class ProductResponse {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductListDto {
        private Integer prodNum;
        private String prodName;
        private String prodInfo;
        private Integer prodWishCount;
        private Integer prodReadCount;
        private String prodCategory;
        private String prodImage;
        private Integer prodPrice;
        private String prodState;

        public static ProductListDto of(Product product) {
            return new ProductListDto(
                    product.getProdNum(),
                    product.getProdName(),
                    product.getProdInfo(),
                    product.getProdWishCount(),
                    product.getProdReadCount(),
                    product.getProdCategory(),
                    product.getProductImages().get(0).getProdSaveName(),
                    product.getProdPriceList().get(0),
                    product.getProdState()
            );
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class ProductDetailDto {
        private Integer prodNum;
        private String prodName;
        private String prodCategory;
        private String prodInfo;
        private List<OptionDetailDto> prodOptions;
        private List<String> prodImage;
        private Scent scent;
        private boolean isWish;
        private String prodState;
        private List<ReviewDto> reviewList;

        private ProductDetailDto(Integer prodNum,
                                 String prodName,
                                 String prodCategory,
                                 String prodInfo,
                                 List<String> prodImage,
                                 Scent scent,
                                 boolean isWish,
                                 String prodState,
                                 List<ReviewDto> reviewList) {
            this.prodNum = prodNum;
            this.prodName = prodName;
            this.prodCategory = prodCategory;
            this.prodInfo = prodInfo;
            this.prodImage = prodImage;
            this.scent = scent;
            this.isWish = isWish;
            this.prodState = prodState;
            this.reviewList = reviewList;
        }

        public static ProductDetailDto of(Product product,
                                          String memberId,
                                          List<ProductResponse.ReviewDto> reviews) {
            ProductDetailDto productDetailDto = new ProductDetailDto(product.getProdNum(),
                    product.getProdName(),
                    product.getProdCategory(),
                    product.getProdInfo(),
                    product.getImageSaveNameList(),
                    product.getScent(),
                    product.isWish(memberId, product.getProdNum()),
                    product.getProdState(),
                    reviews);
            productDetailDto.setOptions(product.getProductOption());

            return productDetailDto;
        }

        public void setOptions(List<ProductOption> options) {
            prodOptions = options.stream()
                    .filter(option -> !option.getOptionState().equals("판매종료"))
                    .map(OptionDetailDto::of)
                    .collect(Collectors.toList());
        }
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
    @AllArgsConstructor
    public static class OptionDetailDto {
        private Integer prodOptionNum;
        private String prodOption;
        private Integer prodPrice;
        private String optionState;

        public static OptionDetailDto of(ProductOption productOption) {
            return new OptionDetailDto(productOption.getOptionNum(),
                    productOption.getProdOption(),
                    productOption.getProdPrice(),
                    productOption.getOptionState());
        }

    }

    @Getter
    @AllArgsConstructor
    public static class ReviewDto {
        private String memberId;
        private String reviewContent;
        private String reviewDate;
        private Integer reviewScore;
        private List<ReviewComment> reviewCommentList;
        private Integer reviewNum;
        private Integer reviewGoodCount;
        private boolean reviewIsGood;

        public static ReviewDto of(Review review) {
            String memberId = SecurityUtils.getCurrentMemberId().get();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy . MM . dd");
            String formattedDate = review.getReviewDate().format(formatter);
            return new ReviewDto(
                    review.getMemberId(),
                    review.getReviewContent(),
                    formattedDate,
                    review.getReviewScore(),
                    review.getComments(),
                    review.getReviewNum(),
                    review.getReviewGoodCount(),
                    review.isReviewGood(memberId)
            );
        }
    }
}
