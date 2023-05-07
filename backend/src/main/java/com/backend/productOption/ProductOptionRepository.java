package com.backend.productOption;

import com.backend.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductOptionRepository extends JpaRepository<ProductOption, Integer> {

    List<ProductOption> findByProduct(Product product);

}
