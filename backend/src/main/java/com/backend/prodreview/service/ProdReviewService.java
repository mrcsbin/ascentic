package com.backend.prodreview.service;

import com.backend.prodreview.dto.ReviewDto;
import com.backend.prodreview.entity.ProdReview;

import java.util.List;

public interface ProdReviewService {
    public List<ReviewDto> findAllByProdNum(Integer prodNum);
}
