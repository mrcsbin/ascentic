package com.backend.order;

import com.backend.member.Member;
import com.backend.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;

    @Override
    public Integer insertOrder(OrderDTO orderDTO) {
        Member member = memberRepository.findById(orderDTO.getMemberId()).orElse(null);
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
                    .orderState(orderDTO.getOrderState())
                    .build());
        return order.getOrderId();
    }

    @Override
    public AddressDTO getRecentAddr(String memberId) {
        Order order = orderRepository.findFirstByMemberOrderByOrderIdDesc(memberRepository.findById(memberId).orElse(null));

        return AddressDTO.builder()
                .memberId(memberId)
                .shipMainAddress(order.getShipMainAddress())
                .shipSubAddress(order.getShipSubAddress())
                .build();
    }
}
