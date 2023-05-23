package com.backend.prodreviewcomment.entity;

import com.backend.prodreview.entity.ProdReview;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "tb_prod_review_comment")
public class ProdReviewComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_review_comment_key")
    private Integer prodReviewCommentKey;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prod_review_key")
    private ProdReview prodReview;

    @Column(name = "member_id")
    private String memberId;

    @CreationTimestamp
    @Column(name = "comment_date")
    private LocalDateTime commentDate;

    @Column(name = "comment_content")
    private String commentContent;
}
