package com.backend.cart.service;

import com.backend.cart.dto.CartRequest;
import com.backend.cart.dto.CartResponse;

import java.util.List;

public interface CartService {

    List<CartResponse.GetCartDto> getCart();

    void addCart(CartRequest.AddCartDto cartAddDto);

    void deleteCart(Integer cartNum);

    void updateCart(CartRequest.UpdateCartDto updateCartDto);
}
