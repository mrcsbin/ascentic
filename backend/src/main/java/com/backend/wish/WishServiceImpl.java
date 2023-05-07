package com.backend.wish;

import com.backend.member.MemberRepository;
import com.backend.product.Product;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class WishServiceImpl implements WishService{

    private WishRepository wishRepository;
    private MemberRepository memberRepository;

    public void addWish(Product product, String memberId){
        Wish wish = new Wish();
        wish.setProduct(product);
        wish.setMember(this.memberRepository.findById(memberId).orElse(null));
        this.wishRepository.save(wish);
    }

    public void delWish(Product product, String memberId){
        this.wishRepository.deleteWish(product.getProdNum(),memberId);
    }

    public int isWish(int prodNum, String memberId){
        int res = this.wishRepository.isWish(prodNum, memberId);
        return res;
    }

    public List<Wish> listWish(String memberId){
        List<Wish> wishlist = this.wishRepository.findAllByMember(this.memberRepository.findById(memberId).orElse(null));
        return wishlist;
    }
}
