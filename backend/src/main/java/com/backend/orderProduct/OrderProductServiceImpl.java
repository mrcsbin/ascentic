package com.backend.orderProduct;

import com.backend.order.Order;
import com.backend.order.OrderRepository;
import com.backend.productOption.ProductOption;
import com.backend.productOption.ProductOptionRepository;
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
