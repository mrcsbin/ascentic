package com.backend.product.repository;

import com.backend.product.entity.Product;
import com.backend.scent.entity.Scent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByScentScentNoteName(String scentName);

//    @Modifying
//    @Query("UPDATE Product p SET p.prodReadCount = p.prodReadCount + 1 WHERE p.prodNum = :prodNum")
//    void incrementReadCount(Integer prodNum);
}
