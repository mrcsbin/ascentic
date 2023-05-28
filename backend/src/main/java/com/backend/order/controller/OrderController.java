package com.backend.order.controller;

import com.backend.order.dto.*;
import com.backend.order.entity.Order;
import com.backend.order.entity.PaymentFinalRes;
import com.backend.order.repository.OrderRepository;
import com.backend.order.service.OrderService;
import com.backend.orderproduct.repository.OrderProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class OrderController {
    private final OrderService orderService;
    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;

    @PostMapping("/finishorder")// 상품 주문 API
    public PaymentRes insertOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.insertOrder(orderDTO);
    }

    @GetMapping("/recentaddr") // 최근 배송지 가져오기
    public AddressDTO getRecentAddr() {
        return orderService.getRecentAddr();
    }

    @GetMapping("/successpayment") // 결제 완료 정보 조회
    public ResponseEntity<?> paymentFinalRes(@RequestParam String paymentKey,
                                             @RequestParam String orderId, @RequestParam Integer amount) {

        PaymentFinalRes finalRes = new PaymentFinalRes();
        try {
            orderService.verifyRequest(paymentKey, orderId, amount);
            PaymentFinalRes result = orderService.requestFinalPayment(paymentKey, orderId, amount);
            finalRes.setOrderName(result.getOrderName());
            finalRes.setCard(result.getCard());
            finalRes.setTotalAmount(result.getTotalAmount());
            orderService.saveRes(result);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Order orderRes = orderRepository.findByOrderId(orderId);

        SuccessOrderDto successreturn = (SuccessOrderDto.builder()
                .orderName(orderRes.getOrderName()) //주문자
                .orderId(orderRes.getOrderId()) // 토스용 orderId
                .orderDate(orderRes.getOrderDate()) //구매날짜
                .email(orderRes.getOrderEmail()) //구매자 이메일
                .shipName(orderRes.getOrderName())  // 수령인 이름
                .shipAddress(orderRes.getShipMainAddress()) //수령인 배송지
                .shipTel(orderRes.getShipTel()) //수령인 전번
                .shipCharge(orderRes.getShipCharge()) //배송비
                .orderPriceSum(finalRes.getTotalAmount()) //상품가격
                .prodNames(finalRes.getOrderName()) //구매한 제품명
                .totalProdCount(orderProductRepository.getProdCountSum(orderRes.getOrderNum())) // 총 구매한 제품 개수
                .orderState(orderRes.getOrderState())  //결제 상태
                .card(finalRes.getCard()) //카드 정보
                .failure(finalRes.getFailure()) //결제실패시
                .build());

        String failureCode = finalRes.getFailure() != null ? finalRes.getFailure().getCode() : "";
        String failureMessage = finalRes.getFailure() != null ? finalRes.getFailure().getMessage() : "";
        HttpHeaders headers = new HttpHeaders();
        URI location = UriComponentsBuilder.fromUriString("http://localhost:3000/ordercomplete")
//                .queryParam("orderName", orderRes.getOrderName())
                .queryParam("orderId", orderRes.getOrderId())
//                .queryParam("orderDate", orderRes.getOrderDate())
//                .queryParam("email", orderRes.getOrderEmail())
//                .queryParam("shipName", orderRes.getOrderName())
//                .queryParam("shipAddress", orderRes.getShipMainAddress())
//                .queryParam("shipTel", orderRes.getShipTel())
//                .queryParam("shipCharge", orderRes.getShipCharge())
//                .queryParam("orderPriceSum", finalRes.getTotalAmount())
//                .queryParam("prodNames", finalRes.getOrderName())
//                .queryParam("totalProdCount", orderProductRepository.getProdCountSum(orderRes.getOrderNum()))
//                .queryParam("orderState", orderRes.getOrderState())
//                .queryParam("cardIssuerCode", finalRes.getCard().getIssuerCode())
//                .queryParam("cardNumber", finalRes.getCard().getNumber())
//                .queryParam("cardInstallment", finalRes.getCard().getInstallmentPlanMonths())
//                .queryParam("cardType", finalRes.getCard().getCardType())
//                .queryParam("cardOwnerType", finalRes.getCard().getOwnerType())
//                .queryParam("failureCode", failureCode)
//                .queryParam("failureMessage", failureMessage)
                .build()
                .toUri();
        headers.setLocation(location);
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .headers(headers)
                .build();
    }

    @GetMapping("/orderCompleteInfo")
    public SuccessOrderDto getOrderCompleteInfo(String orderId) {
        Order orderRes = orderService.orderFindByOrderId(orderId);
        PaymentFinalRes finalRes =orderService.paymentFinalResFindByOrderId(orderId);
        String failureCode = finalRes.getFailure() != null ? finalRes.getFailure().getCode() : "";
        String failureMessage = finalRes.getFailure() != null ? finalRes.getFailure().getMessage() : "";
        SuccessOrderDto successreturn = SuccessOrderDto.builder()
                .orderName(orderRes.getOrderName()) // 주문자
                .orderId(orderRes.getOrderId()) // 토스용 orderId
                .orderDate(orderRes.getOrderDate()) // 구매날짜
                .email(orderRes.getOrderEmail()) // 구매자 이메일
                .shipName(orderRes.getOrderName()) // 수령인 이름
                .shipAddress(orderRes.getShipMainAddress()) // 수령인 배송지
                .shipTel(orderRes.getShipTel()) // 수령인 전화번호
                .shipCharge(orderRes.getShipCharge()) // 배송비
                .orderPriceSum(finalRes.getTotalAmount()) // 상품 가격
                .prodNames(finalRes.getOrderName()) // 구매한 제품명
                .totalProdCount(orderProductRepository.getProdCountSum(orderRes.getOrderNum())) // 총 구매한 제품 개수
                .orderState(orderRes.getOrderState()) // 결제 상태
                .card( // 카드 정보
                        Card.builder()
                                .issuerCode(finalRes.getCard().getIssuerCode())
                                .number(finalRes.getCard().getNumber())
                                .installmentPlanMonths(finalRes.getCard().getInstallmentPlanMonths())
                                .cardType(finalRes.getCard().getCardType())
                                .ownerType(finalRes.getCard().getOwnerType())
                                .build()
                )
                .failure(
                        Failure.builder()
                                .code(failureCode)
                                .message(failureMessage)
                                .build()
                ) // 결제 실패 시
        .build();
        System.out.println("============================================================오빠?오빠?차이써?");
        return successreturn;
    }

}
