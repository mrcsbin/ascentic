package com.backend.wish.controller;

import com.backend.wish.dto.WishResponse;
import com.backend.wish.service.WishService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wish")
@RequiredArgsConstructor
public class WishController {

    private final WishService wishService;

    @PostMapping("/set")
    public void setWish(@RequestBody Integer productNum) {
        wishService.setWish(productNum);
    }

    @GetMapping("/get")
    public List<WishResponse.WishListDto> getWishList() {
        return wishService.getWishList();
    }
}
