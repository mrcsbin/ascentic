package com.backend.orderproduct.repository;

import com.backend.orderproduct.entity.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {

    Optional<List<OrderProduct>> findAllByMemberId(String memberId);
    @Query(value = "select sum(prod_count) from tb_order_prod where order_num = :orderNum", nativeQuery = true)
    public Integer getProdCountSum(Integer orderNum);
}
