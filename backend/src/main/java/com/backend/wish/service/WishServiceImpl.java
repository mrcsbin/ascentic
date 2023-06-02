package com.backend.wish.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.product.entity.Product;
import com.backend.product.repository.ProductRepository;
import com.backend.wish.dto.WishResponse;
import com.backend.wish.entity.Wish;
import com.backend.wish.repository.WishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishServiceImpl implements WishService {

    private final WishRepository wishRepository;
    private final ProductRepository productRepository;

    @Override
    public void setWish(Integer productNum) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Product product = productRepository.findById(productNum).get();
        Optional<Wish> findWish = wishRepository.findByMemberIdAndProduct(currentMemberId, product);
        if (findWish.isPresent()) {
            wishRepository.delete(wishRepository.findByMemberIdAndProduct(currentMemberId, product).get());
            product.setProdWishCount(product.getProdWishCount() - 1);
        } else {
            wishRepository.save(Wish.builder()
                    .memberId(currentMemberId)
                    .product(productRepository.findById(productNum).get())
                    .build());
            product.setProdWishCount(product.getProdWishCount() + 1);
        }
        productRepository.save(product);
    }

    @Override
    public List<WishResponse.WishListDto> getWishList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<Wish> wishList = wishRepository.findAllByMemberId(currentMemberId);

        return wishList.stream()
                .filter(wish -> !wish.getProduct().getProdState().equals("판매종료"))
                .map(WishResponse.WishListDto::of)
                .collect(Collectors.toList());
    }
}
