package com.backend.orderproduct.service;

import com.backend.cart.repository.CartRepository;
import com.backend.member.jwt.SecurityUtils;
import com.backend.order.entity.Order;
import com.backend.order.repository.OrderRepository;
import com.backend.orderproduct.dto.OrderProductRequest;
import com.backend.orderproduct.dto.OrderProductResponse;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.repository.OrderProductRepository;
import com.backend.productoption.entity.ProductOption;
import com.backend.productoption.repository.ProductOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrderProductServiceImpl implements OrderProductService {
    private final OrderProductRepository orderProductRepository;
    private final OrderRepository orderRepository;
    private final ProductOptionRepository productOptionRepository;
    private final CartRepository cartRepository;

    @Override
    public void insertOrderProduct(OrderProductRequest.OrderProductDto orderProductDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Order order = orderRepository.findById(orderProductDto.getOrderNum()).orElse(null);
        ProductOption productOption = productOptionRepository.findById(orderProductDto.getOptionNum()).orElse(null);
        OrderProduct orderProduct = OrderProduct.builder()
                .order(order)
                .productOption(productOption)
                .prodCount(orderProductDto.getProdCount())
                .orderState(orderProductDto.getOrderState())
                .memberId(currentMemberId)
                .orderReviewState("리뷰쓰기")
                .build();
        cartRepository.delete(cartRepository.findByMemberIdAndProductOption(currentMemberId, productOption).get());
        orderProductRepository.save(orderProduct);
    }

    @Override
    public List<OrderProductResponse.OrderProductListDto> getOrderProductList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        return orderProductRepository.findAllByMemberId(currentMemberId).get().stream()
                .map(OrderProductResponse.OrderProductListDto::of)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderProductResponse.OrderReviewListDto> getOrderReviewList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<OrderProduct> orderProducts = orderProductRepository.findAllByMemberId(currentMemberId).orElse(Collections.emptyList());

        updateOrderReviewState(orderProducts);

        List<OrderProductResponse.OrderReviewListDto> orderReviewList = orderProducts.stream()
                .filter(orderProduct -> orderProduct.getOrderState().equals("배송 완료"))
                .map(OrderProductResponse.OrderReviewListDto::of)
                .collect(Collectors.toList());

        return orderReviewList;
    }

    private void updateOrderReviewState(List<OrderProduct> orderProducts) {
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime fifteenDaysAgo = currentDate.minusDays(15);

        for (OrderProduct orderProduct : orderProducts) {
            if (orderProduct.getOrder().getOrderDate().isBefore(fifteenDaysAgo) && orderProduct.getOrderReviewState().equals("리뷰 쓰기")) {
                orderProduct.setOrderReviewState("작성 기간 만료");
                orderProductRepository.save(orderProduct);
            }
        }
    }
}