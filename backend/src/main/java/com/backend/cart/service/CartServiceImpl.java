package com.backend.cart.service;

import com.backend.cart.dto.CartRequest;
import com.backend.cart.dto.CartResponse;
import com.backend.cart.entity.Cart;
import com.backend.cart.repository.CartRepository;
import com.backend.member.jwt.SecurityUtils;
import com.backend.productoption.entity.ProductOption;
import com.backend.productoption.repository.ProductOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductOptionRepository productOptionRepository;

    @Override
    public List<CartResponse.GetCartDto> getCart() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        return cartRepository.findByMemberId(currentMemberId).stream()
                .map(CartResponse.GetCartDto::of)
                .collect(Collectors.toList());
    }

    @Override
    public void addCart(CartRequest.AddCartDto cartAddDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        ProductOption productOption = productOptionRepository.findById(cartAddDto.getProductOptionNum())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 ProductOptionNum 입니다."));

        Cart cart = cartRepository.findByMemberIdAndProductOption(currentMemberId, productOption).map(c -> {
                    c.setProdCount(c.getProdCount() + cartAddDto.getProductCount());
                    return c;
                })
                .orElseGet(() -> Cart.builder()
                        .productOption(productOption)
                        .memberId(currentMemberId)
                        .prodCount(cartAddDto.getProductCount())
                        .build());

        cartRepository.save(cart);
    }

    @Override
    public void deleteCart(Integer cartNum) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Optional<Cart> findCartItem = cartRepository.findByMemberIdAndCartNum(currentMemberId, cartNum);
        if (findCartItem.isPresent()) {
            cartRepository.delete(findCartItem.get());
        }
    }

    @Override
    public void updateCart(CartRequest.UpdateCartDto updateCartDto) {
        Optional<Cart> findCart = cartRepository.findById(updateCartDto.getCartNum());
        if (findCart.isPresent()) {
            findCart.get().setProdCount(updateCartDto.getProductCount());
            cartRepository.save(findCart.get());
        }
    }
}
