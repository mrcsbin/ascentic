package com.backend.product;

import java.util.List;

public interface ProductService {

    public Product ProdDetail(Integer prod_num);

    List<Product> getListByCategory(String category);
}
