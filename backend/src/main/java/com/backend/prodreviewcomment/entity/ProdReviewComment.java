package com.backend.prodreviewcomment.entity;

import com.backend.prodreview.entity.ProdReview;
import jakarta.persistence.*;
import lombok.*;
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

    @ManyToOne
    @JoinColumn(name = "prod_review_key")
    private ProdReview prodReview;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "comment_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date commentDate;

    @Column(name = "comment_content")
    private String commentContent;
}
