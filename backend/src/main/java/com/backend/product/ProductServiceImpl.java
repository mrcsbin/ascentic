package com.backend.product;

import com.backend.productImg.ProductImg;
import com.backend.productImg.ProductImgServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    public void create(Product product){
        productRepository.save(product);
    }

    @Override
    public Product ProdDetail(Integer prod_num) {
        Product product = productRepository.findById(prod_num).orElse(null);
        return product;
    }

}
