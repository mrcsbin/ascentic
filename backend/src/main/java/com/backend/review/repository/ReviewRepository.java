package com.backend.review.repository;

import com.backend.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByProdNum(Integer prodNum);

    void deleteByProdNumAndMemberId(Integer prodNum, String memberId);

    List<Review> findByMemberId(String currentMemberId);

    Review findByOrderProductOrderOrderIdAndOrderProductOrderProdNum(String orderId, Integer orderProductNum);

    void deleteByOrderProductOrderOrderIdAndOrderProductOrderProdNum(String orderId, Integer orderProductNum);
}
