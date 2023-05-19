package com.backend.productOption.service;

import com.backend.product.entity.Product;
import com.backend.product.repository.ProductRepository;
import com.backend.productOption.repository.ProductOptionRepository;
import com.backend.productOption.entity.ProductOption;
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
