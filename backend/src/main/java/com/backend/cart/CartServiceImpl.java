package com.backend.cart;

import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.productOption.ProductOption;
import com.backend.productOption.ProductOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;
    private final ProductOptionRepository productOptionRepository;

    @Override
    public void addCart(CartAddDto cartAddDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Optional<Member> member = this.memberRepository.findById(currentMemberId);
        if (member.isPresent()) { //isPresent: null인지 아닌지 검사
            Cart cart = Cart.builder()
                    .productOption(productOptionRepository.findById(cartAddDto.getOptionNum()).orElse(null))
                    .member(member.get())
                    .prodCount(cartAddDto.getProdCount())
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

    public List<GetCartDto> getCartV2() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<Cart> carts = cartRepository.findByMemberId(currentMemberId);
        List<GetCartDto> cartItems = new ArrayList<>();
        for (Cart cart : carts) {
            GetCartDto build = GetCartDto.builder()
                    .prodImage("미정")
                    .prodName(cart.getProductOption().getProduct().getProdName())
                    .prodOption(cart.getProductOption().getProdOption())
                    .cartNum(cart.getCartNum())
                    .prodPrice(cart.getProductOption().getProduct().getProdPrice())
                    .build();
            cartItems.add(build);
        }
        return cartItems;
    }

    public void addCartV2(CartAddDto cartAddDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member member = memberRepository.findById(currentMemberId).get();
        ProductOption productOption = productOptionRepository.findById(cartAddDto.getOptionNum()).get();
        Optional<Cart> findCartByMemberIdAndProductOption = cartRepository.findByMemberIdAndProductOption(currentMemberId, productOption);
        Cart cart = findCartByMemberIdAndProductOption.map(c -> Cart.builder()
                        .cartNum(c.getCartNum())
                        .productOption(productOption)
                        .member(member)
                        .prodCount(cartAddDto.getProdCount() + c.getProdCount())
                        .build())
                .orElse(Cart.builder()
                        .productOption(productOption)
                        .member(member)
                        .prodCount(cartAddDto.getProdCount())
                        .build());
        cartRepository.save(cart);
    }
}
