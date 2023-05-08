package com.backend.cart;

import com.backend.productOption.ProductOption;

import java.util.List;

public interface CartService {

    public void addCart(ProductOption productOption, String memberId, int prodCount);

    public List<Cart> listCart(String memberId);

    public void deleteCart(ProductOption productOption, String memberId);
}
