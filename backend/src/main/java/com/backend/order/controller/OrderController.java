package com.backend.order.controller;

import com.backend.member.jwt.SecurityUtils;
import com.backend.order.dto.*;
import com.backend.order.entity.*;
import com.backend.order.dto.admin.AdminOrderManageDto;
import com.backend.order.dto.admin.AdminOrderUpdateDto;
import com.backend.order.entity.Card;
import com.backend.order.entity.Failure;
import com.backend.order.entity.Order;
import com.backend.order.entity.PaymentFinalRes;
import com.backend.order.repository.OrderRepository;
import com.backend.order.service.OrderServiceImpl;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.repository.OrderProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class OrderController {
    private final OrderServiceImpl orderService;
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

    @GetMapping("/successpayment") // 최종 결제 승인 요청
    public ResponseEntity<?> paymentFinalRes(@RequestParam String paymentKey,
                                             @RequestParam String orderId, @RequestParam Integer amount) {

        PaymentFinalRes finalRes = new PaymentFinalRes();
        try {
            orderService.verifyRequest(paymentKey, orderId, amount);
            PaymentFinalRes result = orderService.requestFinalPayment(paymentKey, orderId, amount);
            finalRes.setOrderName(result.getOrderName());
            System.out.println("========================================================");
            System.out.println(result);

            //when the payment method is not Card
           if(result.getCard() ==null) {
               finalRes.setEasyPay(result.getEasyPay());
               orderService.saveRes(result);
           } else //when the payment method is Card
           { finalRes.setCard(result.getCard());
            finalRes.setTotalAmount(result.getTotalAmount());
            System.out.println(result);
            orderService.saveRes(result);}
         Order order= orderRepository.findByOrderId(orderId);
            System.out.println(order);

            System.out.println("===========================================================================");
           orderService.changeOrderState(order,"결제완료");
            orderService.changePaymentState(order,true);
            List<OrderProduct> orderproduct = orderProductRepository.findByOrder(order);
            orderproduct.forEach(product -> product.setOrderState("결제완료"));
        } catch (Exception e) {
            e.printStackTrace();
        }

//
//        {"mId":"tvivarepublica","lastTransactionKey":"02D61857B027C91963EBC067A1527C2D"
//                ,"paymentKey":"OR1ZwdkQD5GePWvyJnrKavKzKQjoNa3gLzN97EoqYA60XKx4","orderId":"20230531455ab1",
//                "orderName":"우디 디퓨저외 5 종","taxExemptionAmount":0,"status":"DONE","requestedAt":"2023-05-31T22:27:01+09:00",
//                "approvedAt":"2023-05-31T22:27:22+09:00","useEscrow":false,"cultureExpense":false,"card":null,
//                "virtualAccount":null,"transfer":null,"mobilePhone":null,"giftCertificate":null,"cashReceipt":null,
//                "cashReceipts":null,"discount":null,"cancels":null,"secret":"ps_kYG57Eba3G20n0R7zkGw8pWDOxmA",
//                "type":"NORMAL","easyPay":{"provider":"토스페이","amount":115000,"discountAmount":0},"country":"KR",
//                "failure":null,"isPartialCancelable":true,
//                "receipt":{"url":"https://dashboard.tosspayments.com/receipt/redirection?transactionId=tviva20230531222705yy3q4&ref=PX"},"checkout":{"url":"https://api.tosspayments.com/v1/payments/OR1ZwdkQD5GePWvyJnrKavKzKQjoNa3gLzN97EoqYA60XKx4/checkout"},"currency":"KRW","totalAmount":115000,"balanceAmount":115000,"suppliedAmount":104545,"vat":10455,"taxFreeAmount":0,"method":"간편결제","version":"2022-11-16"}
//

        Order orderRes = orderRepository.findByOrderId(orderId);
        orderService.updatePaymentState(orderRes);

        SuccessOrderDto successreturn = (SuccessOrderDto.builder()
                .orderName(orderRes.getOrderName()) //주문자
                .orderId(orderRes.getOrderId()) // 토스용 orderId
                .orderDate(orderRes.getOrderDate()) //구매날짜
                .email(orderRes.getOrderEmail()) //구매자 이메일
                .shipName(orderRes.getOrderName())  // 수령인 이름
                .shipMainAddress(orderRes.getShipMainAddress()) //수령인 배송지
                .shipSubAddress(orderRes.getShipSubAddress()) //수령인 배송지
                .shipTel(orderRes.getShipTel()) //수령인 전번
                .shipCharge(orderRes.getShipCharge()) //배송비
                .orderPriceSum(finalRes.getTotalAmount()) //상품가격
                .prodNames(finalRes.getOrderName()) //구매한 제품명
                .totalProdCount(orderProductRepository.getProdCountSum(orderRes.getOrderNum())) // 총 구매한 제품 개수
                .orderState("결제 완료") //결제 상태
                .card(finalRes.getCard()) //카드 정보
                .failure(finalRes.getFailure()) //결제실패시
                .build());

        String failureCode = finalRes.getFailure() != null ? finalRes.getFailure().getCode() : "";
        String failureMessage = finalRes.getFailure() != null ? finalRes.getFailure().getMessage() : "";
        HttpHeaders headers = new HttpHeaders();
        URI location = UriComponentsBuilder.fromUriString("http://localhost:3000/ordercomplete")
                .queryParam("orderId", orderRes.getOrderId())
                .build()
                .toUri();
        headers.setLocation(location);

        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .headers(headers)
                .build();
    }

    @GetMapping("/orderCompleteInfo")
    public SuccessOrderDto getOrderCompleteInfo(String orderId) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        Order orderRes = orderService.findByOrderIdAndMemberId(orderId, currentMemberId);
        PaymentFinalRes finalRes = orderService.paymentFinalResFindByOrderId(orderId);

        if (orderRes.getOrderId() == "0") {
            return SuccessOrderDto.builder()
                    .orderId("0")
                    .build();
        }

        // 널포인터 익셉션 방지용
        String failureCode = finalRes.getFailure() != null ? finalRes.getFailure().getCode() : "";
        String failureMessage = finalRes.getFailure() != null ? finalRes.getFailure().getMessage() : "";

        String issuerCode= finalRes.getCard() != null ? finalRes.getCard().getIssuerCode() : "";
        String number =(finalRes.getCard() != null ? finalRes.getCard().getNumber() : "");
        Integer installmentPlanMonths= (finalRes.getCard() != null ? finalRes.getCard().getInstallmentPlanMonths() : 0);
        String cardType = finalRes.getCard() != null ? finalRes.getCard().getCardType() : "";
        String ownerType = finalRes.getCard() != null ? finalRes.getCard().getOwnerType() : "";
        String provider = finalRes.getEasyPay() != null ? finalRes.getEasyPay().getProvider() : "";


        SuccessOrderDto successreturn = SuccessOrderDto.builder()
                .orderName(orderRes.getOrderName()) // 주문자
                .orderId(orderRes.getOrderId()) // 토스용 orderId
                .orderDate(orderRes.getOrderDate()) // 구매날짜
                .email(orderRes.getOrderEmail()) // 구매자 이메일
                .shipName(orderRes.getOrderName()) // 수령인 이름
                .shipMainAddress(orderRes.getShipMainAddress())
                .shipSubAddress(orderRes.getShipSubAddress()) // 수령인 배송지
                .shipTel(orderRes.getShipTel()) // 수령인 전화번호
                .shipCharge(orderRes.getShipCharge()) // 배송비
                .orderPriceSum(finalRes.getTotalAmount()) // 상품 가격
                .prodNames(finalRes.getOrderName()) // 구매한 제품명
                .totalProdCount(orderProductRepository.getProdCountSum(orderRes.getOrderNum())) // 총 구매한 제품 개수
                .orderState(orderRes.getOrderState()) // 결제 상태
                .card( // 카드 정보
                        Card.builder()
                                .issuerCode(issuerCode)
                                .number(number)
                                .installmentPlanMonths(installmentPlanMonths)
                                .cardType(cardType)
                                .ownerType(ownerType)
                                .build()
                ).easyPay(
                        EasyPay.builder()
                                .provider(provider)
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

    @GetMapping("/getAdminOrderInfo")
    public List<AdminOrderManageDto> getAdminOrderInfo(@RequestParam("orderState") String orderState) {
        return orderService.getAdminOrderInfo(orderState);
    }

    @PostMapping("/updateOrderInfo")
    public void updateOrder(@RequestBody AdminOrderUpdateDto AdminOrderUpdateDto) {
        orderService.updateOrder(AdminOrderUpdateDto);
    }

    @GetMapping("/order/getlist")
    public List<OrderResponse.OrderListDto> getOrderList() {
        return orderService.getOrderList();
    }

    @GetMapping("/order/delete")
    public void deleteCancelOrder() {
        orderService.deleteCancelOrder();
    }

    @GetMapping("/order/get/mypage-profile")
    public List<OrderResponse.MyPageProfileOrderListDto> getRecentOrdersInMyPageProfile() {
        return orderService.getRecentOrdersInMyPageProfile();
    }
}
