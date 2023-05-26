package com.backend.order.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.order.dto.*;
import com.backend.order.entity.Order;
import com.backend.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public PaymentRes insertOrder(OrderDTO orderDTO) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        String orderIdTemp = UUID.randomUUID().toString();

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
                .orderId(orderIdTemp)

                .build());
        String prodNames = orderDTO.getProdNames();
        String productNames= countProdNames(prodNames);
        PaymentRes res = PaymentRes.builder()
                .payment(orderDTO.getOrderPayment())
                .amount(orderDTO.getOrderPriceSum())
                .orderName(productNames)
                .customerName(memberRepository.findById(currentMemberId).orElseThrow().getName())
                .orderNum(orderRepository.findByOrderId(orderIdTemp).getOrderNum())
                .orderId(orderIdTemp)
                .successUrl("http://localhost:3000/")
                .failUrl("http://localhost:3000/mypage")
                .createDate(OffsetDateTime.now(ZoneOffset.ofHours(9)).toString())
                .paySuccssYn("Y")
                .build();

        return res;
    }

    @Override
    public AddressDTO getRecentAddr() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        Order order = orderRepository.findFirstByMemberIdOrderByOrderNumDesc(currentMemberId);

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

    private static String countProdNames(String prodNames) {
        String[] prodNamesArray = prodNames.split(",");
        int count = prodNamesArray.length - 1;
        String firstProduct = prodNamesArray[0].trim();
        String purchaseName;
        if(prodNamesArray.length==1){
            purchaseName=firstProduct;
        }
        else{
           purchaseName  = firstProduct +"외 "+count+" 종";
        }

        return purchaseName;
    }

}
