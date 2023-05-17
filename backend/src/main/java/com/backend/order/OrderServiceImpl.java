package com.backend.order;

import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;

    @Override
    public Integer insertOrder(OrderDTO orderDTO) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        Member member = memberRepository.findById(currentMemberId).orElse(null);
        Order order = orderRepository.save(Order.builder()
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
    public AddressDTO getRecentAddr() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        Order order = orderRepository.findFirstByMemberOrderByOrderIdDesc(memberRepository.findById(currentMemberId).orElse(null));

        return AddressDTO.builder()
                .memberId(currentMemberId)
                .shipMainAddress(order.getShipMainAddress())
                .shipSubAddress(order.getShipSubAddress())
                .build();
    }

    @Override
    public MemberInfoDto getMemberInfo() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member findMember = memberRepository.findById(currentMemberId)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        String[] emailParts = findMember.getEmail().split("@");
        return MemberInfoDto.builder()
                .email(emailParts[0])
                .domain(emailParts[1])
                .name(findMember.getName())
                .tel(findMember.getPhone())
                .build();
    }
}
