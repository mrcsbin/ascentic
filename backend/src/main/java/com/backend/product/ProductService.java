package com.backend.product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    public void createNewProd(Product product);
    public Product ProdDetail(Integer prod_num);
    public void prodOrder();

}
