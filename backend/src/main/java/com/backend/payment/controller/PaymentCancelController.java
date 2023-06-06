package com.backend.payment.controller;

import com.backend.order.repository.PaymentFinalResRepository;
import com.backend.payment.dto.PaymentCancelRequest;
import com.backend.payment.dto.PaymentCancelRequestDto;
import com.backend.payment.repository.SubscribePaymentReceiptRepository;
import com.backend.payment.service.PaymentCancelServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaymentCancelController {

    private final PaymentFinalResRepository paymentFinalResRepository;
    private final SubscribePaymentReceiptRepository subscribePaymentReceiptRepository;
    private final PaymentCancelServiceImpl paymentCancelService;

    @PostMapping("" +
            "")
    public String cancelPayment(@RequestBody PaymentCancelRequestDto request) {
        String cancelResult = paymentCancelService.cancelPayment(request);
        return cancelResult;
    }

    @PostMapping("/order/cancel/orderproduct")
    public String cancelOrderProduct(@RequestBody PaymentCancelRequest.OrderProductCancelDto request) {
        return paymentCancelService.cancelOrderProduct(request);
    }

//{"mId":"tvivarepublica","lastTransactionKey":"7CCA169604F323C38420C67AB1435FFB",
// "paymentKey":"vNA96Bjgq7XZYkKL4Mrjwz9G2w1RBE80zJwlEWR52xydGPnO",
// "orderId":"20230602a3b24a","orderName":"우디 디퓨저외 6 종","taxExemptionAmount":0,
//
// "status":"CANCELED",
//
// "requestedAt":"2023-06-02T11:31:37+09:00",
// "approvedAt":"2023-06-02T11:32:45+09:00",
// "useEscrow":false,"cultureExpense":false,
// "card":{"issuerCode":"31","acquirerCode":"31","number":"49062512****789*","installmentPlanMonths":3,"isInterestFree":false,"interestPayer":"BUYER","approveNo":"00000000",
// "useCardPoint":false,"cardType":"신용","ownerType":"개인","acquireStatus":"READY","amount":135000},
// "virtualAccount":null,"transfer":null,"mobilePhone":null,"giftCertificate":null,"cashReceipt":null,
// "cashReceipts":null,"discount":null,"cancels":[{"transactionKey":"7CCA169604F323C38420C67AB1435FFB",
// "cancelReason":"걍 싫어","taxExemptionAmount":0,"canceledAt":"2023-06-02T11:40:33+09:00",
// "easyPayDiscountAmount":0,"receiptKey":null,"cancelAmount":135000,"taxFreeAmount":0,"refundableAmount":0}],
// "secret":null,"type":"NORMAL","easyPay":null,"country":"KR","failure":null,"isPartialCancelable":true,
// "receipt":{"url":"https://dashboard.tosspayments.com/receipt/redirection?transactionId=tviva20230602113245dW4C8&ref=PX"},
// "checkout":{"url":"https://api.tosspayments.com/v1/payments/vNA96Bjgq7XZYkKL4Mrjwz9G2w1RBE80zJwlEWR52xydGPnO/checkout"},
// "currency":"KRW","totalAmount":135000,"balanceAmount":0,"suppliedAmount":0,"vat":0,"taxFreeAmount":0,"method":"카드","version":"2022-11-16"}


}
