package com.backend.review.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.repository.OrderProductRepository;
import com.backend.productimg.entity.ProductImg;
import com.backend.productimg.repository.ProductImgRepository;
import com.backend.review.dto.ReviewDto;
import com.backend.review.dto.PostReviewDto;
import com.backend.review.dto.ReviewListDto;
import com.backend.review.entity.Review;
import com.backend.review.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final OrderProductRepository orderProductRepository;
    private final ProductImgRepository productImgRepository;

    @Override
    public List<ReviewDto> findAllByProdNum(Integer prodNum) {
        List<Review> prodReviews = reviewRepository.findByProdNum(prodNum);
        List<ReviewDto> reviewDtos = new ArrayList<>();

        for (Review prodReview : prodReviews) {
            reviewDtos.add(ReviewDto.of(prodReview));
        }
        return reviewDtos;
    }

    /**
     * 일단 리뷰목록 조회 먼저 하자
     */
    public void addReview(PostReviewDto postReviewDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        reviewRepository.save(Review.builder()
                .memberId(currentMemberId)
                .prodNum(postReviewDto.getProductNum())
                .reviewContent(postReviewDto.getReviewContent())
                .reviewDate(postReviewDto.getReviewDate())
                .reviewScore(postReviewDto.getReviewScore())
                .orderProduct(orderProductRepository.findById(postReviewDto.getOrderProductNum()).get())
                .build());
    }

    /**
     * Order 테이블에 order_review_state 추가해야함
     */
    @Override
    public List<ReviewListDto> getReviewList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<Review> reviewList = reviewRepository.findByMemberId(currentMemberId);
        List<ReviewListDto> reviewListDto = new ArrayList<>();
        for (Review review : reviewList) {
            String productImage = productImgRepository.findByProdImageTypeAndProductProdNum(0, review.getProdNum()).getProdSaveName();
            reviewListDto.add(ReviewListDto.builder()
                    .productImage(productImage)
                    .productName(review.getOrderProduct().getProductOption().getProduct().getProdName())
                    .productOptionName(review.getOrderProduct().getProductOption().getProdOption())
                    .productNum(review.getProdNum())
                    .orderDate(review.getOrderProduct().getOrder().getOrderDate())
                    .orderProductQuantity(review.getOrderProduct().getProdCount())
                    .orderProductPrice(review.getOrderProduct().getProductOption().getProdPrice())
                    .orderProductReviewState(review.getOrderProduct().getOrderState())
                    .orderProductNum(review.getOrderProduct().getOrderProdNum())
                    .build());
        }
        return reviewListDto;
    }

    @Override
    @Transactional
    public void deleteReview(Integer prodNum) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        reviewRepository.deleteByProdNumAndMemberId(prodNum, currentMemberId);
    }
}
