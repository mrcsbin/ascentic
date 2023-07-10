package com.backend.subscribeproduct.repository;

import com.backend.subscribeproduct.entity.SubscribeProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SbProductRepository extends JpaRepository<SubscribeProduct, Integer> {
    List<SubscribeProduct> findByScentNameScentNoteName(String scentNoteName);
}
