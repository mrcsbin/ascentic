package com.backend.cart.service;

import com.backend.cart.dto.AddCartDto;
import com.backend.cart.dto.GetCartDto;
import com.backend.cart.entity.Cart;
import com.backend.cart.repository.CartRepository;
import com.backend.member.jwt.SecurityUtils;
import com.backend.productoption.entity.ProductOption;
import com.backend.productoption.repository.ProductOptionRepository;
import com.backend.productimg.repository.ProductImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductOptionRepository productOptionRepository;
    private final ProductImgRepository productImgRepository;

    public List<GetCartDto> getCart() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<Cart> findCartItems = cartRepository.findByMemberId(currentMemberId);
        List<GetCartDto> cartItems = new ArrayList<>();
        for (Cart cart : findCartItems) {
            String productImage = productImgRepository.findByProdImageTypeAndProductProdNum(0, cart.getProductOption().getProduct().getProdNum()).getProdSaveName();
            GetCartDto build = GetCartDto.builder()
                    .prodImage(productImage)
                    .prodName(cart.getProductOption().getProduct().getProdName())
                    .prodOption(cart.getProductOption().getProdOption())
                    .cartNum(cart.getCartNum())
                    .prodPrice(cart.getProductOption().getProdPrice())
                    .prodCount(cart.getProdCount())
                    .build();
            cartItems.add(build);
        }
        return cartItems;
    }

    public void addCart(AddCartDto cartAddDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        ProductOption productOption = productOptionRepository.findById(cartAddDto.getOptionNum()).get();
        Optional<Cart> findCartItem = cartRepository.findByMemberIdAndProductOption(currentMemberId, productOption);
        Cart cart = findCartItem.map(c -> Cart.builder()
                        .cartNum(c.getCartNum())
                        .productOption(productOption)
                        .memberId(currentMemberId)
                        .prodCount(cartAddDto.getProdCount() + c.getProdCount())
                        .build())
                .orElse(Cart.builder()
                        .productOption(productOption)
                        .memberId(currentMemberId)
                        .prodCount(cartAddDto.getProdCount())
                        .build());
        cartRepository.save(cart);
    }

    public void deleteCart(Integer cartNum) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Optional<Cart> findCartItem = cartRepository.findByMemberIdAndCartNum(currentMemberId, cartNum);
        if (findCartItem.isPresent()) {
            cartRepository.delete(findCartItem.get());
        }
    }
}
