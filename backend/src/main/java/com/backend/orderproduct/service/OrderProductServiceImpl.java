package com.backend.orderproduct.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.order.entity.Order;
import com.backend.order.repository.OrderRepository;
import com.backend.orderproduct.dto.OrderListDto;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.dto.OrderProductDto;
import com.backend.orderproduct.repository.OrderProductRepository;
import com.backend.productimg.entity.ProductImg;
import com.backend.productimg.repository.ProductImgRepository;
import com.backend.productoption.entity.ProductOption;
import com.backend.productoption.repository.ProductOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OrderProductServiceImpl implements OrderProductService {
    private final OrderProductRepository orderProductRepository;
    private final OrderRepository orderRepository;
    private final ProductOptionRepository productOptionRepository;
    private final ProductImgRepository productImgRepository;

    @Override
    public void insetOrderProduct(OrderProductDto orderProductDTO) {
        Order order = orderRepository.findById(orderProductDTO.getOrderId()).orElse(null);
        ProductOption productOption = productOptionRepository.findById(orderProductDTO.getOptionNum()).orElse(null);
        OrderProduct orderProduct = OrderProduct.builder()
                .order(order)
                .productOption(productOption)
                .prodCount(orderProductDTO.getProdCount())
                .orderState(orderProductDTO.isOrderState())
                .build();

        orderProductRepository.save(orderProduct);
    }

    @Override
    public List<OrderListDto> getOrderList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<OrderListDto> orderListDto = new ArrayList<>();
        Optional<List<OrderProduct>> orderProductList = orderProductRepository.findAllByMemberId(currentMemberId);
        if (orderProductList.isPresent()) {
            for (OrderProduct orderProduct : orderProductList.get()) {
                String prodSaveName = productImgRepository.findById(orderProduct.getProductOption().getProduct().getProdNum()).get().getProdSaveName();
                orderListDto.add(OrderListDto.builder()
                        .productImage(prodSaveName)
                        .productName(orderProduct.getProductOption().getProduct().getProdName())
                        .productOptionName(orderProduct.getProductOption().getProdOption())
                        .productNum(orderProduct.getProductOption().getProduct().getProdNum())
                        .orderDate(orderProduct.getOrder().getOrderDate())
                        .orderProductQuantity(orderProduct.getProdCount())
                        .orderProductPrice(orderProduct.getProductOption().getProdPrice())
                        .orderShippingState(orderProduct.getOrderState())
                        .build());
            }
        }
        return orderListDto;
    }
}
