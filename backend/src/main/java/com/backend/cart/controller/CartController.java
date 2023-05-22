package com.backend.cart.controller;

import com.backend.cart.dto.AddCartDto;
import com.backend.cart.service.CartServiceImpl;
import com.backend.cart.dto.GetCartDto;
import com.backend.cart.entity.Cart;
import com.backend.productoption.entity.ProductOption;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartServiceImpl cartServiceImpl;

    @GetMapping("/get")
    public List<GetCartDto> getCartV2() {
        return cartServiceImpl.getCart();
    }

    @PostMapping("/add")
    public void addCartV2(@RequestBody AddCartDto cartAddDto) {
        cartServiceImpl.addCart(cartAddDto);
    }

    @DeleteMapping("/del/{cartNum}")
    public void deleteCartV3(@PathVariable Integer cartNum) {
        cartServiceImpl.deleteCart(cartNum);
    }
}
