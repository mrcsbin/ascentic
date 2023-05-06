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
    public OrderProduct insetOrderProduct(Integer orderId, Integer optionNum, OrderProduct orderProduct) {
        Order order = orderRepository.findById(orderId).orElse(null);
        ProductOption productOption = productOptionRepository.findById(optionNum).orElse(null);
        orderProduct.setOrder(order);
        orderProduct.setProductOption(productOption);

        return orderProductRepository.save(orderProduct);
    }
}
