package com.backend.wish.controller;

import com.backend.wish.dto.WishResponse;
import com.backend.wish.service.WishServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/wish")
@RequiredArgsConstructor
public class WishController {

    private final WishServiceImpl wishServiceImpl;

    @GetMapping("/set")
    public void setWish(Integer prodNum) {
        wishServiceImpl.setWish(prodNum);
    }

    @GetMapping("/get")
    public List<WishResponse.WishListDto> getWishList() {
        return wishServiceImpl.getWishList();
    }
}
