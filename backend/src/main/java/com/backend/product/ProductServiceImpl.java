package com.backend.product;

import com.backend.productImg.ProductImg;
import com.backend.productImg.ProductImgServiceImpl;
import com.backend.scent.Scent;
import com.backend.scent.ScentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    private final ScentRepository scentRepository;

    public void create(Product product){
        productRepository.save(product);
    }

    @Override
    public Product ProdDetail(Integer prod_num) {
        Product product = productRepository.findById(prod_num).orElse(null);
        return product;
    }

    @Override
    public List<Product> getListByCategory(String category) {
        // 모두 조회
        if (category.equals("all")){
            List<Product> products = productRepository.findAll();
            return products;
        }

        // 대분류 조회
        List<Scent> scents = scentRepository.findScentByScentNoteName(category);
        List<Product> products = new ArrayList<>();
        for(Scent scent : scents) {
            List<Product> prods = productRepository.findByScent(scent);
            for(Product product : prods) {
                products.add(product);
            }
        }

        return products;
    }
}
