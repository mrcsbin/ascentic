package com.backend.order;

import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;

    @Override
    public Integer insertOrder(OrderDTO orderDTO) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        Member member = memberRepository.findById(currentMemberId).orElse(null);

        Order order =  orderRepository.save(Order.builder()
                .member(member)
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
        Order order = orderRepository.findFirstByMemberOrderByOrderIdDesc(memberRepository.findById(currentMemberId).orElse(null));

        return AddressDTO.builder()
                .shipMainAddress(order.getShipMainAddress())
                .shipSubAddress(order.getShipSubAddress())
                .build();
    }
}
