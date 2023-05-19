package com.backend.productOption.service;

import com.backend.productOption.entity.ProductOption;

import java.util.List;

public interface ProductOptionService {
    public List<ProductOption> getProdOption(Integer prodNum);
}
