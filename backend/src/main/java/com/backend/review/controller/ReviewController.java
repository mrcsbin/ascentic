package com.backend.review.controller;

import com.backend.review.dto.PostReviewDto;
import com.backend.review.dto.ReviewListDto;
import com.backend.review.service.ReviewServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewServiceImpl reviewService;

//    @GetMapping("/get")
//    public List<ReviewDto> getReview(Integer prodNum) {
//        return reviewService.findAllByProdNum(prodNum);
//    }

    @PostMapping("/add")
    public void addReview(@RequestBody PostReviewDto postReviewDto) {
        System.out.println("postReviewDto.getReviewContent() = " + postReviewDto.getReviewContent());
        reviewService.addReview(postReviewDto);
    }

    @GetMapping("/get")
    public List<ReviewListDto> getReviewList() {
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
