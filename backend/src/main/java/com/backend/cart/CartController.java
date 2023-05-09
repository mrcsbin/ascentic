package com.backend.cart;

import com.backend.productOption.ProductOption;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class CartController {

    private CartServiceImpl cartServiceImpl;


    public CartController(CartServiceImpl cartServiceImpl){
        this.cartServiceImpl = cartServiceImpl;
    }

    @PostMapping("/addcart")
    public void addCart(ProductOption productOption, String memberId, int prodCount){
        this.cartServiceImpl.addCart(productOption, memberId, prodCount);
    }
    //추가: 같은 상품인 경우 개수만 증가하도록 조정

    @PostMapping("/cart")
    public List<Cart> listCart(String memberId){
        List<Cart> cartlist = this.cartServiceImpl.listCart(memberId);
        return cartlist;
    }

    @PostMapping("/deletecart")
    public void deleteCart(ProductOption productOption, String memberId){
        this.cartServiceImpl.deleteCart(productOption, memberId);
    }
}
