package com.backend.prodreview.entity;

import com.backend.orderproduct.entity.OrderProduct;
import com.backend.prodreviewcomment.entity.ProdReviewComment;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_prod_review")
@Builder
public class ProdReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_review_key")
    private Integer prodReviewKey;

    @ManyToOne
    @JoinColumn(name = "order_prod_key")
    private OrderProduct orderProd;

    @Column(name = "member_id", nullable = false)
    private String memberId;

    @Column(name = "prod_num", nullable = false)
    private Integer prodNum;

    @CreationTimestamp
    @Column(name = "review_date", nullable = false)
    private Date reviewDate;

    @Column(name = "review_content", nullable = false)
    private String reviewContent;

    @Column(name = "review_image")
    private String reviewImage;

    @Column(name = "review_score", nullable = false)
    private Integer reviewScore;


    @OneToMany(mappedBy = "prodReviewKey", cascade = CascadeType.ALL)
    private List<ProdReviewComment> comments;

}
