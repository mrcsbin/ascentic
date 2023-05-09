package com.backend.cart;

import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.productOption.ProductOption;
import com.backend.productOption.ProductOptionRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;

    private final ProductOptionRepository productOptionRepository;

    @Override
    public void addCart(CartDTO cartDTO) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Optional<Member> member = this.memberRepository.findById(currentMemberId);
        if (member.isPresent()) { //isPresent: null인지 아닌지 검사
            Cart cart = Cart.builder()
                    .productOption(productOptionRepository.findById(cartDTO.getOptionNum()).orElse(null))
                    .member(member.get())
                    .prodCount(cartDTO.getProdCount())
                    .build();
            cartRepository.save(cart);
        } else {
//            throw new DataNotFoundException("member not found");
        }
    }

    @Override
    public List<Cart> listCart() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<Cart> cartlist = this.cartRepository.findAllByMember(this.memberRepository.findById(currentMemberId).orElse(null));
        return cartlist; //사진이랑 상품 정보는?...
    }

    @Override
    public void deleteCart(ProductOption productOption) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        this.cartRepository.deleteCart(productOption.getOptionNum(), currentMemberId);
    }
}
