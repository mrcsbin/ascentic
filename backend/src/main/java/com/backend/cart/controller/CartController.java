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

    @GetMapping
    public List<Cart> getCart() {
        List<Cart> cartList = cartServiceImpl.listCart();
        return cartList;
    }

    @PostMapping
    public void addCart(@RequestBody AddCartDto cartAddDto) {
        this.cartServiceImpl.addCart(cartAddDto);
    }
    //추가: 같은 상품인 경우 개수만 증가하도록 조정

    @DeleteMapping
    public void deleteCart(ProductOption productOption) {
        this.cartServiceImpl.deleteCart(productOption);
    }

    @GetMapping("/getv2")
    public List<GetCartDto> getCartV2() {
        return cartServiceImpl.getCartV2();
    }

    @PostMapping("/addv2")
    public void addCartV2(@RequestBody AddCartDto cartAddDto) {
        cartServiceImpl.addCartV2(cartAddDto);
    }

    @DeleteMapping("/delv2/{cartNum}")
    public void deleteCartV3(@PathVariable Integer cartNum) {
        cartServiceImpl.deleteCartV2(cartNum);
    }
}
