package com.backend.prodreview.dto;

import com.backend.prodreview.entity.ProdReview;
import com.backend.prodreviewcomment.entity.ProdReviewComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;


@AllArgsConstructor
@Data
public class ReviewDto {
    private String memberId;
    private LocalDateTime reviewDate;
    private String reviewContent;
    private Integer reviewScore;
    private List<ProdReviewComment> comments;

    public static ReviewDto of(ProdReview prodReview) {
        return new ReviewDto(prodReview.getMemberId(), prodReview.getReviewDate(), prodReview.getReviewContent(), prodReview.getReviewScore(), prodReview.getComments());

    }
}
