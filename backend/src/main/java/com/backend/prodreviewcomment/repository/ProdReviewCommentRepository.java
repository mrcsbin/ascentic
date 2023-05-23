package com.backend.prodreviewcomment.repository;

import com.backend.prodreviewcomment.entity.ProdReviewComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdReviewCommentRepository extends JpaRepository<ProdReviewComment, Integer> {
}
