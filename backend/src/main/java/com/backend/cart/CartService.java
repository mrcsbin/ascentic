package com.backend.cart;

import com.backend.productOption.ProductOption;

import java.util.List;

public interface CartService {

    public void addCart(ProductOption productOption, int prodCount);

    public List<Cart> listCart();

    public void deleteCart(ProductOption productOption);
}
