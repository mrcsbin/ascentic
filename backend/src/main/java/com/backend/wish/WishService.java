package com.backend.wish;

import com.backend.product.Product;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

public interface WishService {

    public void addWish(Product product, String memberId);

    public void delWish(Product product, String memberId);

    public int isWish(int prodNum, String memberId);

    public List<Wish> listWish(String memberId);
}
