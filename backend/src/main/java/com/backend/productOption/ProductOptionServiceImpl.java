package com.backend.productOption;

import com.backend.product.Product;
import com.backend.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductOptionServiceImpl implements ProductOptionService{

    private final ProductOptionRepository productOptionRepository;
    private final ProductRepository productRepository;

    @Override
    public List<ProductOption> getProdOption(Integer prodNum) {
        Product product = productRepository.findById(prodNum).orElse(null);
        return productOptionRepository.findByProduct(product);
    }


}
