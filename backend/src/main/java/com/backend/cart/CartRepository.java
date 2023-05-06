package com.backend.cart;

import com.backend.member.Member;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    public List<Cart> findByMember(Member member);

    @Transactional
    @Modifying //insert, update, delete시 사용
    @Query(value="delete from tb_cart where option_num = :optionNum and member_id = :memberId",
            nativeQuery=true)
    public void deleteCart(int optionNum, String memberId);

    public List<Cart> findAllByMember(Member member);
}
