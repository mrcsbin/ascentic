package com.backend.adminPost;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminPostRepository extends JpaRepository<AdminPost, Long> {

    List<AdminPost> findByPostCategory(String category);
}
