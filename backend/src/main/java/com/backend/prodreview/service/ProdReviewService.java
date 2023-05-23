package com.backend.prodreview.service;

import com.backend.prodreview.entity.ProdReview;

import java.util.List;

public interface ProdReviewService {
    public List<ProdReview> findAllByProdNum(Integer prodNum);
}
