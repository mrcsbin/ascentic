package com.backend.productOption;

import com.backend.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductOptionRepository extends JpaRepository<ProductOption, Integer> {

    List<ProductOption> findByProduct(Product product);

}
