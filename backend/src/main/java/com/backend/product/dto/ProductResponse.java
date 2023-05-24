package com.backend.product.dto;

import com.backend.reviewcomment.entity.ReviewComment;
import com.backend.scent.entity.Scent;
import lombok.Builder;
import lombok.Getter;

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
        private Integer prodOptionNum;
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
