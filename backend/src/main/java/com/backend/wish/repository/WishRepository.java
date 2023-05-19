package com.backend.wish.repository;

import com.backend.member.entity.Member;
import com.backend.wish.entity.Wish;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WishRepository extends JpaRepository<Wish, Integer> {

    @Transactional
    @Modifying //insert, update, delete시 사용
    @Query(value="delete from tb_wish where prod_num = :prodNum and member_id = :memberId",
            nativeQuery=true)
    public void deleteWish(@Param("prodNum") Integer prodNum, @Param("memberId") String memberId);

    @Query(value="select count(*) from tb_wish where prod_num = :prodNum and member_id = :memberId",
            nativeQuery=true)
    public int isWish(@Param("prodNum") Integer prodNum, @Param("memberId") String memberId);

//    @Query(value="select * from tb_product where prod_num = (select prod_num from tb_wish where member_id = :memberId)",
//            nativeQuery=true)
//    public List<Product> listWish(String memberId);

    public List<Wish> findAllByMember(Member member);
}
