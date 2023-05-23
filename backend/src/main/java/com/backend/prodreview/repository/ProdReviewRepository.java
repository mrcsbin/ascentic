package com.backend.prodreview.repository;

import com.backend.prodreview.entity.ProdReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdReviewRepository extends JpaRepository<ProdReview, Integer> {
    List<ProdReview> findByProdNum(Integer prodNum);
}
