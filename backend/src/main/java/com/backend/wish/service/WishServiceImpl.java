package com.backend.wish.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.product.repository.ProductRepository;
import com.backend.wish.entity.Wish;
import com.backend.wish.repository.WishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishServiceImpl implements WishService{

    private final WishRepository wishRepository;
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;

    public void addWish(Integer prodNum){
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        Wish wish = new Wish();
        wish.setProduct(productRepository.findById(prodNum).orElse(null));
        wish.setMember(this.memberRepository.findById(currentMemberId).orElse(null));
        this.wishRepository.save(wish);
    }

    public void delWish(Integer prodNum){
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        this.wishRepository.deleteWish(prodNum,currentMemberId);
    }

    public int isWish(Integer prodNum){
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        int res = this.wishRepository.isWish(prodNum, currentMemberId);
        return res;
    }

    public List<Wish> listWish(){
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<Wish> wishlist = this.wishRepository.findAllByMember(this.memberRepository.findById(currentMemberId).orElse(null));
        return wishlist;
    }
}
