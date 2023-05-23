package com.backend.prodreview.service;

import com.backend.orderproduct.repository.OrderProductRepository;
import com.backend.prodreview.dto.ReviewDto;
import com.backend.prodreview.entity.ProdReview;
import com.backend.prodreview.repository.ProdReviewRepository;
import com.backend.productoption.repository.ProductOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdReviewServiceImpl implements ProdReviewService {

    private final ProdReviewRepository prodReviewRepository;

    @Override
    public List<ReviewDto> findAllByProdNum(Integer prodNum) {
        List<ProdReview> prodReviews = prodReviewRepository.findByProdNum(prodNum);
        List<ReviewDto> reviewDtos = new ArrayList<>();

        for (ProdReview prodReview : prodReviews) {
            reviewDtos.add(ReviewDto.of(prodReview));
        }

        return reviewDtos;
    }

}
