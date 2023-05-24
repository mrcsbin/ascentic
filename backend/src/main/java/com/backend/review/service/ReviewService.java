package com.backend.review.service;

import com.backend.review.dto.ReviewDto;
import com.backend.review.dto.ReviewListDto;

import java.util.List;

public interface ReviewService {
    public List<ReviewDto> findAllByProdNum(Integer prodNum);

    void deleteReview(Integer prodNum);

    List<ReviewListDto> getReviewList();
}
