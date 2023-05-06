package com.backend.productImg;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductImgServiceImpl implements ProductImgService {

    private ProdImgRepository prodImgRepository;

    public ProductImg getProdImg(Integer prodNum) {
        Optional<ProductImg> productImg = prodImgRepository.findByProdNum(prodNum);
        return productImg.get();
    }
}
