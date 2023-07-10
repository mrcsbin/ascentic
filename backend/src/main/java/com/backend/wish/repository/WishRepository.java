package com.backend.wish.repository;

import com.backend.product.entity.Product;
import com.backend.wish.entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishRepository extends JpaRepository<Wish, Integer> {

    Optional<Wish> findByMemberIdAndProduct(String memberId, Product product);

    List<Wish> findAllByMemberId(String memberId);
}
