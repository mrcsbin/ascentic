package com.backend.subscribeproduct.repository;

import com.backend.subscribeproduct.entity.SubscribeProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SbProductRepository extends JpaRepository<SubscribeProduct, Integer> {

}
