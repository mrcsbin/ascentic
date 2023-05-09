package com.backend.wish;

import com.backend.product.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class WishController {

    private final WishServiceImpl wishServiceImpl;


    @PostMapping("/addwish")
    public void addWish(@RequestBody WishDTO wishDTO){
        System.out.println(wishDTO.getProdNum());
       this.wishServiceImpl.addWish(wishDTO.getProdNum());
    }

    @PostMapping("/delwish")
    public void delWish(@RequestBody  WishDTO wishDTO){
        this.wishServiceImpl.delWish(wishDTO.getProdNum());
    }

    @GetMapping("/iswish")
    public int isWish(Integer prodNum){
        int res = this.wishServiceImpl.isWish(prodNum);
        return res;
    }

    @PostMapping("/listwish")
    public List<Wish> listWish(){
        List<Wish> wishlist = this.wishServiceImpl.listWish();
        return wishlist;
    }

}
