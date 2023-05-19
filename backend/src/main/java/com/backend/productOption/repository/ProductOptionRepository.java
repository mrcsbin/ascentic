package com.backend.productOption.repository;

import com.backend.product.entity.Product;
import com.backend.productOption.entity.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductOptionRepository extends JpaRepository<ProductOption, Integer> {

    List<ProductOption> findByProduct(Product product);

}
