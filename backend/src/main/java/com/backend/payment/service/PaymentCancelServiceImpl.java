package com.backend.payment.service;

import com.backend.member.entity.Member;
import com.backend.member.repository.MemberRepository;
import com.backend.order.entity.Order;
import com.backend.order.entity.PaymentFinalRes;
import com.backend.order.repository.OrderRepository;
import com.backend.order.repository.PaymentFinalResRepository;
import com.backend.order.service.OrderServiceImpl;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.repository.OrderProductRepository;
import com.backend.payment.dto.PaymentCancelRequest;
import com.backend.payment.dto.PaymentCancelRequestDto;
import com.backend.payment.entity.SubscribePaymentReceipt;
import com.backend.payment.repository.SubscribePaymentReceiptRepository;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class PaymentCancelServiceImpl {
    private final OrderRepository orderRepository;
    private final PaymentFinalResRepository paymentFinalResRepository;
    private final SubscribePaymentReceiptRepository subscribePaymentReceiptRepository;
    private final OrderServiceImpl orderService;
    private final OrderProductRepository orderProductRepository;
    private final MemberRepository memberRepository;

    public String cancelPayment(PaymentCancelRequestDto request) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==");

        HttpEntity<PaymentCancelRequestDto> entity = new HttpEntity<>(request, headers);

        /// 여기 paymentKey 알맞게 찾아와서 끼워주면 됨~
        String paymentKey;
        //구독상품 취소인지, 그냥 상품 취소인지 찾아냄
        PaymentFinalRes forOrderPaymentKey = paymentFinalResRepository.findByOrderId(request.getOrderId());
        SubscribePaymentReceipt forSubscribePaymentKey = subscribePaymentReceiptRepository.findByOrderId(request.getOrderId());
        if (forOrderPaymentKey == null) {
            paymentKey = forSubscribePaymentKey.getPaymentKey();
        } else {
            paymentKey = forOrderPaymentKey.getPaymentKey();
        }

        String tossPaymentsApiUrl = "https://api.tosspayments.com/v1/payments/" + paymentKey + "/cancel";

        ResponseEntity<String> response = restTemplate.postForEntity(tossPaymentsApiUrl, entity, String.class);
        Order order = orderRepository.findByOrderId(request.getOrderId());
        orderService.cancelOrder(order, "결제취소", false);

        return response.getBody();
    }

    private void finalCheck(PaymentCancelRequest.OrderProductCancelDto request) {
        Order order = orderRepository.findByOrderId(request.getOrderId());
        List<OrderProduct> orderProductList = orderProductRepository.findByOrder(order).stream()
                .filter(orderProduct -> orderProduct.getOrderState().equals("결제완료"))
                .collect(Collectors.toList());
        OrderProduct orderProduct = orderProductRepository.findById(request.getOrderProductNum()).get();

        if (orderProductList.size() == 1) {
            request.setCancelAmount(request.getCancelAmount() - order.getUsePoint());
            order.setOrderPriceSum(order.getOrderPriceSum() - request.getCancelAmount() - order.getUsePoint());
            Member member = memberRepository.findById(order.getMemberId()).get();
            // 적립 포인트를 원래상태로 돌리기
            int totalAmount = paymentFinalResRepository.findByOrderId(order.getOrderId()).getTotalAmount() + order.getUsePoint();
            int earnPoint = (int) (totalAmount * 0.01);
            member.setMemberPoint(member.getMemberPoint() + order.getUsePoint() - earnPoint);
            memberRepository.save(member);
            order.setOrderState("결제취소");
        } else {
            order.setOrderPriceSum(order.getOrderPriceSum() - request.getCancelAmount());
        }
        orderProduct.setOrderState("결제취소");
        orderRepository.save(order);
        orderProductRepository.save(orderProduct);
    }

    public String cancelOrderProduct(PaymentCancelRequest.OrderProductCancelDto request) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==");
        finalCheck(request);

        HttpEntity<PaymentCancelRequest.OrderProductCancelDto> entity = new HttpEntity<>(request, headers);

        String paymentKey;
        PaymentFinalRes forOrderPaymentKey = paymentFinalResRepository.findByOrderId(request.getOrderId());
        paymentKey = forOrderPaymentKey.getPaymentKey();

        String tossPaymentsApiUrl = "https://api.tosspayments.com/v1/payments/" + paymentKey + "/cancel";

        ResponseEntity<String> response = restTemplate.postForEntity(tossPaymentsApiUrl, entity, String.class);
        return response.getBody();
    }
}
