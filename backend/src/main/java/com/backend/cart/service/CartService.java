package com.backend.cart.service;

import com.backend.cart.dto.AddCartDto;
import com.backend.cart.dto.GetCartDto;
import com.backend.cart.entity.Cart;
import com.backend.productoption.entity.ProductOption;

import java.util.List;

public interface CartService {

    List<GetCartDto> getCart();

    void addCart(AddCartDto cartAddDto);

    void deleteCart(Integer cartNum);
}
