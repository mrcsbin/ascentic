package com.backend.cart.service;

import com.backend.cart.dto.AddCartDto;
import com.backend.cart.entity.Cart;
import com.backend.productoption.entity.ProductOption;

import java.util.List;

public interface CartService {

    public void addCart(AddCartDto cartDTO);

    public List<Cart> listCart();

    public void deleteCart(ProductOption productOption);
}
