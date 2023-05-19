package com.backend.product.service;

import com.backend.product.entity.Product;

import java.util.List;

public interface ProductService {

    public Product ProdDetail(Integer prod_num);

    List<Product> getListByCategory(String category);
}
