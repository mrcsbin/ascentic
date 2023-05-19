package com.backend.subscribeProduct.repository;

import com.backend.subscribeProduct.entity.SubscribeProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SbProductRepository extends JpaRepository<SubscribeProduct, Integer> {

}
