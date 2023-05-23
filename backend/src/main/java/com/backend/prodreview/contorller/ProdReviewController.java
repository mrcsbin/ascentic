package com.backend.prodreview.contorller;

import com.backend.prodreview.dto.ReviewDto;
import com.backend.prodreview.entity.ProdReview;
import com.backend.prodreview.service.ProdReviewServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProdReviewController {
    private final ProdReviewServiceImpl prodReviewService;

    @GetMapping("/getReview")
    public List<ReviewDto> getReview(Integer prodNum) {
        return prodReviewService.findAllByProdNum(prodNum);
    }
}
