package com.backend.wish.service;

import com.backend.product.entity.Product;
import com.backend.wish.entity.Wish;

import java.util.List;

public interface WishService {

    void setWish(Integer prodNum);

    List<Wish> getWishList();

//    void setWish(Integer prodNum);

//    public void addWish(Integer prodNum);

//    public void delWish(Integer prodNum);

//    public int isWish(Integer prodNum);

}
