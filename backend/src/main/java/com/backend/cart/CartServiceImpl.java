package com.backend.cart;

import com.backend.member.Member;
import com.backend.member.MemberRepository;
import com.backend.productOption.ProductOption;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService{
    private CartRepository cartRepository;
    private MemberRepository memberRepository;
//    private ProductRepository productRepository;

    @Override
    public void addCart(ProductOption productOption, String memberId, int prodCount){
        Optional<Member> member = this.memberRepository.findById(memberId);
        if (member.isPresent()) { //isPresent: null인지 아닌지 검사
            Cart cart = new Cart();
            cart.setProductOption(productOption);
//            cart.setProduct(productRepository.findById(productOption.getProduct()));
            cart.setMember(member.get());
            cart.setProdCount(prodCount);
            this.cartRepository.save(cart);
        } else {
//            throw new DataNotFoundException("member not found");
        }
    }

    @Override
    public List<Cart> listCart(String memberId){
        List<Cart> cartlist = this.cartRepository.findAllByMember(this.memberRepository.findById(memberId).orElse(null));
        return cartlist; //사진이랑 상품 정보는?...
    }

    @Override
    public void deleteCart(ProductOption productOption, String memberId){
        this.cartRepository.deleteCart(productOption.getOptionNum(), memberId);
    }
}
