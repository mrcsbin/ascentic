package com.backend.order.service;

import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.order.dto.AddressDTO;
import com.backend.order.dto.MemberInfoDto;
import com.backend.order.dto.OrderDTO;
import com.backend.order.dto.SuccessOrderDto;
import com.backend.order.entity.Order;
import com.backend.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Override
    public Integer insertOrder(OrderDTO orderDTO) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        Order order =  orderRepository.save(Order.builder()
                .memberId(currentMemberId)
                .orderEmail(orderDTO.getOrderEmail())
                .orderName(orderDTO.getOrderName())
                .orderTel(orderDTO.getOrderTel())
                .shipName(orderDTO.getShipName())
                .shipTel(orderDTO.getShipTel())
                .shipMainAddress(orderDTO.getShipMainAddress())
                .shipSubAddress(orderDTO.getShipSubAddress())
                .shipMessage(orderDTO.getShipMessage())
                .orderPayment(orderDTO.getOrderPayment())
                .orderPaymentInfo(orderDTO.getOrderPaymentInfo())
                .orderPaymentState(orderDTO.getOrderPaymentState())
                .orderPriceSum(orderDTO.getOrderPriceSum())
                .shipCharge(orderDTO.getShipCharge())
                .orderState(orderDTO.getOrderState())
                .build());
        return order.getOrderId();
    }

    @Override
    public AddressDTO getRecentAddr() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        Order order = orderRepository.findFirstByMemberIdOrderByOrderIdDesc(currentMemberId);

        return AddressDTO.builder()
                .shipMainAddress(order.getShipMainAddress())
                .shipSubAddress(order.getShipSubAddress())
                .build();
    }

    @Override
    public SuccessOrderDto getSuccessOrderInfo(Integer orderNum) {
        Order order = orderRepository.findById(orderNum).orElse(null);

        String orderDate = String.valueOf(order.getOrderDate());
        orderDate = orderDate.replaceFirst("-", "년 ").replaceFirst("-", "월 ").replaceFirst("T", "일 ");
        orderDate = orderDate.replaceFirst(":", "시").replaceFirst(":", "분");
        orderDate = orderDate.substring(0, 20);

        return SuccessOrderDto.builder()
                .orderName(order.getOrderName())
                .orderDate(orderDate)
                .email(order.getOrderEmail())
                .shipName(order.getShipName())
                .shipAddress(order.getShipMainAddress() + " " + order.getShipSubAddress())
                .shipTel(order.getShipTel())
                .payMethod(order.getOrderPayment())
                .shipCharge(order.getShipCharge())
                .orderPriceSum(order.getOrderPriceSum())
                .build();
    }
}
