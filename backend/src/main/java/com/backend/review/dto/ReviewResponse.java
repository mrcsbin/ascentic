package com.backend.review.dto;

import com.backend.review.entity.Review;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

public class ReviewResponse {

    @Getter
    @Builder
    public static class ReviewListDto {
        private String productImage;
        private String productName;
        private Integer productNum;
        private String productOptionName;
        private String orderId;
        private String orderDate;
        private Integer orderProductPrice;
        private Integer orderProductCount;
        private Integer orderProductNum;
        private String orderReviewState;

        public static ReviewListDto of(Review review) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy . MM . dd");
            String formattedDate = review.getReviewDate().format(formatter);
            return new ReviewListDto(
                    review.getOrderProduct().getProductOption().getProduct().getProductImages().get(0).getProdSaveName(),
                    review.getOrderProduct().getProductOption().getProduct().getProdName(),
                    review.getOrderProduct().getProductOption().getProduct().getProdNum(),
                    review.getOrderProduct().getProductOption().getProdOption(),
                    review.getOrderProduct().getOrder().getOrderId(),
                    formattedDate,
                    review.getOrderProduct().getProductOption().getProdPrice(),
                    review.getOrderProduct().getProdCount(),
                    review.getOrderProduct().getOrderProdNum(),
                    review.getOrderProduct().getOrderReviewState()
            );
        }
    }

    @Getter
    @Builder
    public static class ReviewDto {
        private Integer reviewScore;
        private String reviewComment;

        public static ReviewDto of(Review review) {
            return new ReviewDto(
                    review.getReviewScore(),
                    review.getReviewContent());
        }
    }
}
