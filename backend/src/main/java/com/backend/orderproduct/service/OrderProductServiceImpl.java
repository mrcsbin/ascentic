package com.backend.orderproduct.service;

import com.backend.order.entity.Order;
import com.backend.order.repository.OrderRepository;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.dto.OrderProductDTO;
import com.backend.orderproduct.repository.OrderProductRepository;
import com.backend.productoption.entity.ProductOption;
import com.backend.productoption.repository.ProductOptionRepository;
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
