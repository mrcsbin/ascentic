package com.backend.review.service;

import com.backend.review.dto.ReviewRequest;
import com.backend.review.dto.ReviewResponse;

import java.util.List;

public interface ReviewService {

    void addReview(ReviewRequest.AddReviewDto addReviewDto);

    List<ReviewResponse.ReviewListDto> getReviewList();

    ReviewResponse.ReviewDto getReview(String orderId, Integer orderProductNum);

    void deleteReview(String orderId, Integer orderProductNum);

    void setReviewCount(Integer reviewNum);
}
