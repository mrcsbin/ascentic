package com.backend.product.repository;

import com.backend.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByScentScentNoteName(String scentName);

//    @Modifying
//    @Query("UPDATE Product p SET p.prodReadCount = p.prodReadCount + 1 WHERE p.prodNum = :prodNum")
//    void incrementReadCount(Integer prodNum);
}
