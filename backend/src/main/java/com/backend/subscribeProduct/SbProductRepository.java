package com.backend.subscribeProduct;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SbProductRepository extends JpaRepository<SubscribeProduct, Integer> {

}
