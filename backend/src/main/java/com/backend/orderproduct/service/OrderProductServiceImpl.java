package com.backend.orderproduct.service;

import com.backend.cart.repository.CartRepository;
import com.backend.member.jwt.SecurityUtils;
import com.backend.order.entity.Order;
import com.backend.order.repository.OrderRepository;
import com.backend.orderproduct.dto.OrderListDto;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.dto.OrderProductDto;
import com.backend.orderproduct.repository.OrderProductRepository;
import com.backend.productoption.entity.ProductOption;
import com.backend.productoption.repository.ProductOptionRepository;
import com.backend.productimage.repository.ProductImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OrderProductServiceImpl implements OrderProductService {
    private final OrderProductRepository orderProductRepository;
    private final OrderRepository orderRepository;
    private final ProductOptionRepository productOptionRepository;
    private final ProductImageRepository productImageRepository;
    private final CartRepository cartRepository;

    @Override
    public void insetOrderProduct(OrderProductDto orderProductDTO) {


        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Order order = orderRepository.findById(orderProductDTO.getOrderNum()).orElse(null);
        ProductOption productOption = productOptionRepository.findById(orderProductDTO.getOptionNum()).orElse(null);
        OrderProduct orderProduct = OrderProduct.builder()
                .order(order)
                .productOption(productOption)
                .prodCount(orderProductDTO.getProdCount())
                .orderState(orderProductDTO.getOrderState())
                .memberId(currentMemberId)
                .build();
        cartRepository.delete(cartRepository.findByMemberIdAndProductOption(currentMemberId, productOption).get());
        orderProductRepository.save(orderProduct);
    }

    @Override
    public List<OrderListDto> getOrderList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<OrderListDto> orderListDto = new ArrayList<>();
        Optional<List<OrderProduct>> orderProductList = orderProductRepository.findAllByMemberId(currentMemberId);
        if (orderProductList.isPresent()) {
            for (OrderProduct orderProduct : orderProductList.get()) {
                String prodSaveName = productImageRepository.findById(orderProduct.getProductOption().getProduct().getProdNum()).get().getProdSaveName();
                String orderDate = String.valueOf(orderProduct.getOrder().getOrderDate());
                orderDate = orderDate.replaceFirst("-", "년 ").replaceFirst("-", "월 ").replaceFirst("T", "일").substring(0, 13);
                orderListDto.add(OrderListDto.builder()
                        .productImage(prodSaveName)
                        .productName(orderProduct.getProductOption().getProduct().getProdName())
                        .productOptionName(orderProduct.getProductOption().getProdOption())
                        .productNum(orderProduct.getProductOption().getProduct().getProdNum())
                        .orderDate(orderDate)
                        .orderProductQuantity(orderProduct.getProdCount())
                        .orderProductPrice(orderProduct.getProductOption().getProdPrice())
                        .orderShippingState(orderProduct.getOrderState())
                        .orderProductNumber(orderProduct.getOrderProdNum())
                        .build());
            }
        }
        return orderListDto;
    }
}
