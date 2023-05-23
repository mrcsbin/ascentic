package com.backend.prodreview.service;

import com.backend.prodreview.entity.ProdReview;
import com.backend.prodreview.repository.ProdReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdReviewServiceImpl implements ProdReviewService {

    private final ProdReviewRepository prodReviewRepository;

    @Override
    public List<ProdReview> findAllByProdNum(Integer prodNum) {
        List<ProdReview> allByProdNum = prodReviewRepository.findAllByProdNum(prodNum);
        return allByProdNum;
    }

}
