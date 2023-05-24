package com.backend.review.service;

import com.backend.review.dto.ReviewDto;
import com.backend.review.entity.Review;
import com.backend.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public List<ReviewDto> findAllByProdNum(Integer prodNum) {
        List<Review> prodReviews = reviewRepository.findByProdNum(prodNum);
        List<ReviewDto> reviewDtos = new ArrayList<>();

        for (Review prodReview : prodReviews) {
            reviewDtos.add(ReviewDto.of(prodReview));
        }

        return reviewDtos;
    }

}
