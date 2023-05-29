package com.backend.cart.controller;

import com.backend.cart.dto.AddCartDto;
import com.backend.cart.dto.CartRequest;
import com.backend.cart.service.CartServiceImpl;
import com.backend.cart.dto.GetCartDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartServiceImpl cartServiceImpl;

    @GetMapping("/get")
    public List<GetCartDto> getCart() {
        return cartServiceImpl.getCart();
    }

    @PostMapping("/add")
    public void addCart(@RequestBody AddCartDto cartAddDto) {
        cartServiceImpl.addCart(cartAddDto);
    }

    @DeleteMapping("/del/{cartNum}")
    public void deleteCart(@PathVariable Integer cartNum) {
        cartServiceImpl.deleteCart(cartNum);
    }

    @PostMapping("/update")
    public void updateCart(@RequestBody CartRequest.UpdateCartDto updateCartDto) {
        System.out.println("updateCartDto.getCartNum() = " + updateCartDto.getCartNum());
        System.out.println("updateCartDto.getProdCount() = " + updateCartDto.getProdCount());
        cartServiceImpl.updateCart(updateCartDto);
    }
}
