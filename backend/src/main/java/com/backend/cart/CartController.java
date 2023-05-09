package com.backend.cart;

import com.backend.member.jwt.SecurityUtils;
import com.backend.productOption.ProductOption;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class CartController {

    private final CartServiceImpl cartServiceImpl;

    @PostMapping("/addcart")
    public void addCart(@RequestBody CartDTO cartDTO){
        this.cartServiceImpl.addCart(cartDTO);
    }
    //추가: 같은 상품인 경우 개수만 증가하도록 조정


    public List<Cart> listCart(){
        List<Cart> cartlist = this.cartServiceImpl.listCart();
        return cartlist;
    }

    @PostMapping("/deletecart")
    public void deleteCart(ProductOption productOption){
        this.cartServiceImpl.deleteCart(productOption);
    }
}
