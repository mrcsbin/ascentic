package com.backend.wish;

import com.backend.product.Product;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

public interface WishService {

    public void addWish(Integer prodNum);

    public void delWish(Integer prodNum);

    public int isWish(Integer prodNum);

    public List<Wish> listWish();
}
