package com.backend.review.dto;

import com.backend.review.entity.Review;
import com.backend.reviewcomment.entity.ReviewComment;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@AllArgsConstructor
@Data
public class ReviewDto {
    private String memberId;
    private LocalDateTime reviewDate;
    private String reviewContent;
    private Integer reviewScore;
    private List<ReviewComment> comments;

    public static ReviewDto of(Review review) {
        return new ReviewDto(review.getMemberId(), review.getReviewDate(), review.getReviewContent(), review.getReviewScore(), review.getComments());

    }
}
