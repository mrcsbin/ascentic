package com.backend.orderproduct.service;

import com.backend.cart.repository.CartRepository;
import com.backend.member.jwt.SecurityUtils;
import com.backend.order.entity.Order;
import com.backend.order.repository.OrderRepository;
import com.backend.orderproduct.dto.OrderRequest;
import com.backend.orderproduct.dto.OrderResponse;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.repository.OrderProductRepository;
import com.backend.productoption.entity.ProductOption;
import com.backend.productoption.repository.ProductOptionRepository;
import com.backend.review.dto.ReviewResponse;
import com.backend.review.entity.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrderProductServiceImpl implements OrderProductService {
    private final OrderProductRepository orderProductRepository;
    private final OrderRepository orderRepository;
    private final ProductOptionRepository productOptionRepository;
    private final CartRepository cartRepository;

    @Override
    public void insertOrderProduct(OrderRequest.OrderProductDto orderProductDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Order order = orderRepository.findById(orderProductDto.getOrderNum()).orElse(null);
        ProductOption productOption = productOptionRepository.findById(orderProductDto.getOptionNum()).orElse(null);
        OrderProduct orderProduct = OrderProduct.builder()
                .order(order)
                .productOption(productOption)
                .prodCount(orderProductDto.getProdCount())
                .orderState(orderProductDto.getOrderState())
                .memberId(currentMemberId)
                .orderReviewState(false)
                .build();
        cartRepository.delete(cartRepository.findByMemberIdAndProductOption(currentMemberId, productOption).get());
        orderProductRepository.save(orderProduct);
    }

    @Override
    public List<OrderResponse.OrderProductListDto> getOrderProductList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        return orderProductRepository.findAllByMemberId(currentMemberId).get().stream()
                .map(OrderResponse.OrderProductListDto::of)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse.OrderReviewListDto> getOrderReviewList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        return orderProductRepository.findAllByMemberId(currentMemberId).get().stream()
                .filter(orderProduct -> orderProduct.getOrderState().equals("배송 완료"))
                .map(OrderResponse.OrderReviewListDto::of)
                .collect(Collectors.toList());
    }
}