package com.backend.productImg;

import com.backend.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProdImgRepository extends JpaRepository<ProductImg,Integer> {
    Optional<ProductImg> findByProdNum(Integer prodNum);
}
