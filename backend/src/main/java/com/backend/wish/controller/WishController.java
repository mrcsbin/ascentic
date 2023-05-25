package com.backend.wish.controller;

import com.backend.wish.dto.WishDto;
import com.backend.wish.dto.WishListDto;
import com.backend.wish.service.WishServiceImpl;
import com.backend.wish.entity.Wish;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wish")
@RequiredArgsConstructor
public class WishController {

    private final WishServiceImpl wishServiceImpl;

    @PostMapping("/set")
    public void setWish(@RequestBody WishDto wishDto) {
        wishServiceImpl.setWish(wishDto.getProdNum());
    }

    @GetMapping("/get")
    public List<WishListDto> getWishList() {
        return wishServiceImpl.getWishList();
    }

    @GetMapping("/iswish")
    public boolean getIsWish(Integer prodNum) {
        return wishServiceImpl.isWish(prodNum);
    }

//    @PostMapping("/addwish")
//    public void addWish(@RequestBody WishDto wishDto) {
//        this.wishServiceImpl.addWish(wishDto.getProdNum());
//    }

//    @PostMapping("/delwish")
//    public void delWish(@RequestBody WishDto wishDto) {
//        this.wishServiceImpl.delWish(wishDto.getProdNum());
//    }

//    @GetMapping("/iswish")
//    public int isWish(Integer prodNum) {
//        int res = this.wishServiceImpl.isWish(prodNum);
//        return res;
//    }
}
