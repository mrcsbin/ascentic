package com.backend.product.service;

import com.backend.product.dto.ProductListDto;
import com.backend.product.entity.Product;

import java.util.List;

public interface ProductService {

    Product ProdDetail(Integer prod_num);

    List<ProductListDto> getListByCategory(String category);
}
