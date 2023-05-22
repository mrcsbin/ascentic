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

    public List<Cart> findByMember(Member member);

    @Transactional
    @Modifying //insert, update, delete시 사용
    @Query(value = "delete from tb_cart where option_num = :optionNum and member_id = :memberId",
            nativeQuery = true)
    public void deleteCart(@Param("optionNum") int optionNum, @Param("memberId") String memberId);

    public List<Cart> findAllByMember(Member member);

    List<Cart> findByMemberId(String memberId);

    Optional<Cart> findByMemberIdAndProductOption(String memberId, ProductOption productOption);

    Optional<Cart> findByMemberIdAndCartNum(String memberId, Integer cartNum);

}
