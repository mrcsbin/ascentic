package com.backend.wish.service;

import com.backend.wish.dto.WishResponse;

import java.util.List;

public interface WishService {

    void setWish(Integer prodNum);

    List<WishResponse.WishListDto> getWishList();
}
