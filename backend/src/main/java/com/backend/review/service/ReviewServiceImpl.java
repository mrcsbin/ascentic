package com.backend.review.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.repository.OrderProductRepository;
import com.backend.review.dto.ReviewRequest;
import com.backend.review.dto.ReviewResponse;
import com.backend.review.entity.Review;
import com.backend.review.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final OrderProductRepository orderProductRepository;

    @Override
    public void addReview(ReviewRequest.AddReviewDto postReviewDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().orElseThrow(() -> new RuntimeException("Current member ID not found"));

        OrderProduct orderProduct = orderProductRepository.findById(postReviewDto.getOrderProductNum())
                .orElseThrow(() -> new RuntimeException("Order product not found"));

        reviewRepository.save(Review.builder()
                .memberId(currentMemberId)
                .prodNum(postReviewDto.getProductNum())
                .reviewContent(postReviewDto.getReviewContent())
                .reviewScore(postReviewDto.getReviewScore())
                .reviewGoodCount(0)
                .orderProduct(orderProduct)
                .build());

        orderProduct.setOrderReviewState(true);
        orderProductRepository.save(orderProduct);
    }

    @Override
    public List<ReviewResponse.ReviewListDto> getReviewList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<Review> reviewList = reviewRepository.findByMemberId(currentMemberId);

        return reviewList.stream()
                .filter(review -> review.getOrderProduct().getOrderState().equals("배송 완료"))
                .map(ReviewResponse.ReviewListDto::of)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteReview(Integer prodNum) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        reviewRepository.deleteByProdNumAndMemberId(prodNum, currentMemberId);
    }

    @Override
    public void setReviewCount(Integer reviewNum) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        Review review = reviewRepository.findById(reviewNum)
                .orElseThrow(() -> new IllegalArgumentException("Invalid reviewNum"));

        review.setReviewCount(currentMemberId);
        reviewRepository.save(review);
    }
}
