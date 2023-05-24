package com.backend.cart.repository;

import com.backend.cart.entity.Cart;
import com.backend.member.entity.Member;
import com.backend.productoption.entity.ProductOption;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByMemberId(String memberId);

    Optional<Cart> findByMemberIdAndProductOption(String memberId, ProductOption productOption);

    Optional<Cart> findByMemberIdAndCartNum(String memberId, Integer cartNum);
}
