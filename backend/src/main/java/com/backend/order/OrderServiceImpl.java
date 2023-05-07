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
    public Order insertOrder(String memberId, Order order) {
        Member member = memberRepository.findById(memberId).orElse(null);
        order.setMember(member);
        return orderRepository.save(order);
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
