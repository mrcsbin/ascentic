package com.backend.wish.service;

import com.backend.wish.dto.WishResponse;

import java.util.List;

public interface WishService {

    void setWish(Integer productNum);

    List<WishResponse.WishListDto> getWishList();
}
