package com.backend.wish.repository;

import com.backend.member.entity.Member;
import com.backend.product.entity.Product;
import com.backend.wish.entity.Wish;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WishRepository extends JpaRepository<Wish, Integer> {

    Optional<Wish> findByMemberIdAndProduct(String memberId, Product product);

    List<Wish> findAllByMemberId(String memberId);

//    @Transactional
//    @Modifying //insert, update, delete시 사용
//    @Query(value = "delete from tb_wish where prod_num = :prodNum and member_id = :memberId",
//            nativeQuery = true)
//    public void deleteWish(@Param("prodNum") Integer prodNum, @Param("memberId") String memberId);
//
//    @Query(value = "select count(*) from tb_wish where prod_num = :prodNum and member_id = :memberId",
//            nativeQuery = true)
//    public int isWish(@Param("prodNum") Integer prodNum, @Param("memberId") String memberId);

//    @Query(value="select * from tb_product where prod_num = (select prod_num from tb_wish where member_id = :memberId)",
//            nativeQuery=true)
//    public List<Product> listWish(String memberId);


//    List<Wish> findAllByProdNum(Integer prodNum);

}
