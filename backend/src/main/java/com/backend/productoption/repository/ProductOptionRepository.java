package com.backend.productoption.repository;

import com.backend.product.entity.Product;
import com.backend.productoption.entity.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductOptionRepository extends JpaRepository<ProductOption, Integer> {

    ProductOption findByProdOption(String prodOption);

}
