package com.backend.productoption.service;

import com.backend.productoption.entity.ProductOption;

import java.util.List;

public interface ProductOptionService {
    public List<ProductOption> getProdOption(Integer prodNum);
}
