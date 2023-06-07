package com.backend.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewRequest {

    @Getter
    public static class AddReviewDto {
        private Integer productNum; // 상품 번호
        private String reviewContent; // 리뷰 내용
        private Integer reviewScore; // 리뷰 점수
        private Integer orderProductNum; // 주문 번호
    }
}
