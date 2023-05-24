package com.backend.reviewcomment.entity;

import com.backend.review.entity.Review;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "tb_review_comment")
public class ReviewComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_comment_num")
    private Integer prodReviewCommentKey;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_num")
    private Review review;

    @Column(name = "member_id")
    private String memberId;

    @CreationTimestamp
    @Column(name = "review_comment_date")
    private LocalDateTime reviewCommentDate;

    @Column(name = "review_comment_content")
    private String reviewCommentContent;
}
