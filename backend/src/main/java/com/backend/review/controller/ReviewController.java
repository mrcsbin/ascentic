package com.backend.review.controller;

import com.backend.review.dto.ReviewRequest;
import com.backend.review.dto.ReviewResponse;
import com.backend.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/add")
    public void addReview(@RequestBody ReviewRequest.AddReviewDto addReviewDto) {
        reviewService.addReview(addReviewDto);
    }

    @GetMapping("/get")
    public List<ReviewResponse.ReviewListDto> getReviewList() {
        return reviewService.getReviewList();
    }

    @GetMapping("/delete")
    public void deleteReview(Integer prodNum) {
        reviewService.deleteReview(prodNum);
    }

    @PostMapping("/count/set")
    public void setReviewCount(@RequestBody Integer reviewNum) {
        reviewService.setReviewCount(reviewNum);
    }
}
