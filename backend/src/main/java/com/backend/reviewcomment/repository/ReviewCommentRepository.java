package com.backend.reviewcomment.repository;

import com.backend.reviewcomment.entity.ReviewComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewCommentRepository extends JpaRepository<ReviewComment, Integer> {
}
