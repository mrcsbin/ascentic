package com.backend.wish;

import com.backend.product.Product;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class WishController {

    private WishServiceImpl wishServiceImpl;

    public WishController(WishServiceImpl wishServiceImpl){
        this.wishServiceImpl = wishServiceImpl;
    }

    @PostMapping("/addwish")
    public void addWish(Product product, String memberId){
       this.wishServiceImpl.addWish(product, memberId);
    }

    @PostMapping("/delwish")
    public void delWish(Product product, String memberId){
        this.wishServiceImpl.delWish(product, memberId);
    }

    @GetMapping("/iswish")
    public int isWish(int prodNum, String memberId){
        int res = this.wishServiceImpl.isWish(prodNum, memberId);
        return res;
    }

    @PostMapping("/listwish")
    public List<Wish> listWish(String memberId){
        List<Wish> wishlist = this.wishServiceImpl.listWish(memberId);
        return wishlist;
    }

}
