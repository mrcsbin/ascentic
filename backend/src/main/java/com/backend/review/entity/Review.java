package com.backend.review.entity;

import com.backend.orderproduct.entity.OrderProduct;
import com.backend.reviewcomment.entity.ReviewComment;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_review")
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_num")
    private Integer reviewNum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_prod_num")
    private OrderProduct orderProduct;

    @Column(name = "member_id", nullable = false)
    private String memberId;

    @Column(name = "prod_num", nullable = false)
    private Integer prodNum;

    @CreationTimestamp
    @Column(name = "review_date", nullable = false)
    private LocalDateTime reviewDate;

    @Column(name = "review_content", nullable = false)
    private String reviewContent;

    @Column(name = "review_score", nullable = false)
    private Integer reviewScore;

    @JsonManagedReference
    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ReviewComment> comments;

    @Column(name = "review_good_count")
    private Integer reviewGoodCount;

    @ElementCollection
    @CollectionTable(name = "tb_review_good_members", joinColumns = @JoinColumn(name = "review_num"))
    @Column(name = "member_id")
    private Set<String> reviewGoodMembers = new HashSet<>();

    public void setReviewCount(String memberId) {
        if (reviewGoodMembers.contains(memberId)) {
            reviewGoodMembers.remove(memberId);
        } else {
            reviewGoodMembers.add(memberId);
        }
        updateReviewGoodCount();
    }

    private void updateReviewGoodCount() {
        reviewGoodCount = reviewGoodMembers.size();
    }

    public boolean isReviewGood(String memberId) {
        if (reviewGoodMembers.contains(memberId)) {
            return true;
        } else {
            return false;
        }
    }
}
