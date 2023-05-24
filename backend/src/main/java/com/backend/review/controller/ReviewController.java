package com.backend.review.controller;

import com.backend.review.dto.ReviewDto;
import com.backend.review.service.ReviewServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewServiceImpl reviewService;

    @GetMapping("/getReview")
    public List<ReviewDto> getReview(Integer prodNum) {
        return reviewService.findAllByProdNum(prodNum);
    }
}
