package com.backend.product.repository;

import com.backend.product.entity.Product;
import com.backend.scent.entity.Scent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByScent(Scent scent);
}
