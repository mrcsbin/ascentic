package com.backend.wish.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.product.entity.Product;
import com.backend.product.repository.ProductRepository;
import com.backend.wish.dto.WishListDto;
import com.backend.wish.entity.Wish;
import com.backend.wish.repository.WishRepository;
import com.backend.productimage.entity.ProductImage;
import com.backend.productimage.repository.ProductImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WishServiceImpl implements WishService {

    private final WishRepository wishRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

//    public void setWish(Integer prodNum) {
//        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
//        Product product = productRepository.findById(prodNum).get();
//        if (isWish(currentMemberId, product)) {
//            wishRepository.delete(wishRepository.findByMemberIdAndProduct(currentMemberId, product).get());
//            product.setProdWishCount(product.getProdWishCount() - 1);
//        } else {
//            wishRepository.save(Wish.builder()
//                    .memberId(currentMemberId)
//                    .product(productRepository.findById(prodNum).get())
//                    .build());
//            product.setProdWishCount(product.getProdWishCount() + 1);
//        }
//        productRepository.save(product);
//    }

    public void setWish(Integer prodNum) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Product product = productRepository.findById(prodNum).get();
        Optional<Wish> findWish = wishRepository.findByMemberIdAndProduct(currentMemberId, product);
        if (findWish.isPresent()) {
            wishRepository.delete(wishRepository.findByMemberIdAndProduct(currentMemberId, product).get());
            product.setProdWishCount(product.getProdWishCount() - 1);
        } else {
            wishRepository.save(Wish.builder()
                    .memberId(currentMemberId)
                    .product(productRepository.findById(prodNum).get())
                    .build());
            product.setProdWishCount(product.getProdWishCount() + 1);
        }
        productRepository.save(product);
    }

    public List<WishListDto> getWishList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<Wish> wishList = wishRepository.findAllByMemberId(currentMemberId);
        List<WishListDto> wishListDto = new ArrayList<>();
        for (Wish wishItem : wishList) {
            ProductImage productImage = productImageRepository.findByProdImageTypeAndProductProdNum(0, wishItem.getProduct().getProdNum());
            String prodImage = productImage.getProdSaveName();
            WishListDto wish = WishListDto.builder()
                    .prodNum(wishItem.getProduct().getProdNum())
                    .prodImage(prodImage)
                    .prodName(wishItem.getProduct().getProdName())
                    .build();
            wishListDto.add(wish);
        }
        return wishListDto;
    }

    public boolean isWish(Integer prodNum) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Product product = productRepository.findById(prodNum).get();
        Optional<Wish> findWish = wishRepository.findByMemberIdAndProduct(currentMemberId, product);
        if (findWish.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

//    public void addWish(Integer prodNum){
//        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
//        Wish wish = new Wish();
//        wish.setProduct(productRepository.findById(prodNum).orElse(null));
//        wish.setMember(currentMemberId);
//        this.wishRepository.save(wish);
//    }


//    public void delWish(Integer prodNum) {
//        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
//        Optional<Product> product = productRepository.findById(prodNum);
//        Optional<Wish> findWish = wishRepository.findByMemberIdAndProduct(currentMemberId, product.get());
//        wishRepository.delete(findWish.get());
//    }

//    public int isWish(Integer prodNum) {
//        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
//        System.out.println(currentMemberId);
//        int res = this.wishRepository.isWish(prodNum, currentMemberId);
//        return res;
//    }


//    public Integer wishList(Integer prodNum) {
//        List<Wish> findWishByProdNum = wishRepository.findAllByProdNum(prodNum);
//        return findWishByProdNum.size();
//    }
}
