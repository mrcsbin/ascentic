package com.backend.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PostReviewDto {
    private Integer productNum; // 상품 번호
    private String reviewContent; // 리뷰 내용
    private LocalDateTime reviewDate; // 리뷰 작성 날짜
    private Integer reviewScore; // 리뷰 점수
    private Integer orderNum; // 주문 상품 번호
}
