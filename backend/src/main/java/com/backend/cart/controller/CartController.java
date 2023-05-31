package com.backend.cart.controller;

import com.backend.cart.dto.CartRequest;
import com.backend.cart.dto.CartResponse;
import com.backend.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/get")
    public List<CartResponse.GetCartDto> getCartList() {
        return cartService.getCart();
    }

    @PostMapping("/add")
    public void addCart(@RequestBody CartRequest.AddCartDto cartAddDto) {
        cartService.addCart(cartAddDto);
    }

    @DeleteMapping("/del/{cartNum}")
    public void deleteCart(@PathVariable Integer cartNum) {
        cartService.deleteCart(cartNum);
    }

    @PostMapping("/update")
    public void updateCart(@RequestBody CartRequest.UpdateCartDto updateCartDto) {
        cartService.updateCart(updateCartDto);
    }
}
