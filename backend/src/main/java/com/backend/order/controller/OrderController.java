package com.backend.order.controller;

import com.backend.order.dto.AddressDTO;
import com.backend.order.dto.OrderDTO;
import com.backend.order.dto.PaymentRes;
import com.backend.order.dto.SuccessOrderDto;
import com.backend.order.entity.Order;
import com.backend.order.entity.PaymentFinalRes;
import com.backend.order.repository.OrderRepository;
import com.backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class OrderController {
    private final OrderService orderService;
    private final OrderRepository orderRepository;

    @PostMapping("/finishorder")// 상품 주문 API
    public PaymentRes insertOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.insertOrder(orderDTO);
    }

    @GetMapping("/recentaddr") // 최근 배송지 가져오기
    public AddressDTO getRecentAddr() {
        return orderService.getRecentAddr();
    }


    @GetMapping("/successpayment") // 결제 완료 정보 조회
    public SuccessOrderDto paymentFinalRes(@RequestParam String paymentKey,
                                    @RequestParam String orderId, @RequestParam Integer amount) {

        PaymentFinalRes finalRes = new PaymentFinalRes();
        try {
            orderService.verifyRequest(paymentKey, orderId, amount);
            PaymentFinalRes result = orderService.requestFinalPayment(paymentKey, orderId, amount);
            finalRes.setOrderName(result.getOrderName());
//            finalRes.setCard(result.getCard());
            finalRes.setTotalAmount(result.getTotalAmount());
            orderService.saveRes(result);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Order orderRes = orderRepository.findByOrderId(orderId);

        return (SuccessOrderDto.builder()
                .orderName(orderRes.getOrderName())
                .orderDate(orderRes.getOrderDate())
                .shipName(orderRes.getOrderName())
                .shipAddress(orderRes.getShipMainAddress())
                .shipTel(orderRes.getShipTel())
                .shipCharge(orderRes.getShipCharge())
                .email(orderRes.getOrderEmail())
                .orderPriceSum(finalRes.getTotalAmount())
//                .payMethod(finalRes.getCard())
                .orderState(orderRes.getOrderState())
                .prodNames(finalRes.getOrderName())
                .build());

    }

}
