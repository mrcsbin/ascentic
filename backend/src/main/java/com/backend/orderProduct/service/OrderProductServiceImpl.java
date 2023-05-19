package com.backend.orderProduct.service;

import com.backend.order.entity.Order;
import com.backend.order.repository.OrderRepository;
import com.backend.orderProduct.entity.OrderProduct;
import com.backend.orderProduct.dto.OrderProductDTO;
import com.backend.orderProduct.repository.OrderProductRepository;
import com.backend.productOption.entity.ProductOption;
import com.backend.productOption.repository.ProductOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OrderProductServiceImpl implements OrderProductService{
    private final OrderProductRepository orderProductRepository;
    private final OrderRepository orderRepository;
    private final ProductOptionRepository productOptionRepository;

    @Override
    public void insetOrderProduct(OrderProductDTO orderProductDTO) {
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
}
