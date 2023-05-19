package com.backend.wish.service;

import com.backend.wish.entity.Wish;

import java.util.List;

public interface WishService {

    public void addWish(Integer prodNum);

    public void delWish(Integer prodNum);

    public int isWish(Integer prodNum);

    public List<Wish> listWish();
}
