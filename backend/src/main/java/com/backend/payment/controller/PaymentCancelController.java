package com.backend.payment.controller;

import com.backend.member.jwt.SecurityUtils;
import com.backend.order.repository.PaymentFinalResRepository;
import com.backend.payment.dto.PaymentCancelRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@RestController
@RequiredArgsConstructor
public class PaymentCancelController {

    private final PaymentFinalResRepository paymentFinalResRepository;

    @GetMapping("/cancelPayment")
//    public String cancelPayment(@RequestBody PaymentCancelRequestDto request){
    public String cancelPayment(){

        PaymentCancelRequestDto request = new PaymentCancelRequestDto();
        request.setCancelReason("고객이 요청을 함~~");

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==");

        HttpEntity<PaymentCancelRequestDto> entity = new HttpEntity<>(request, headers);

        /// 여기 paymentKey 알맞게 찾아와서 끼워주면 됨~
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        String paymentKey = "y05n91dEvLex6BJGQOVDO17kDNaY0O3W4w2zNbgaYRMPoqmD";

        String tossPaymentsApiUrl = "https://api.tosspayments.com/v1/payments/" + paymentKey + "/cancel";

        ResponseEntity<String> response = restTemplate.postForEntity(tossPaymentsApiUrl, entity, String.class);

        System.out.println("-----------------------------------------------------------------------------");
        System.out.println(response.getBody());
        return response.getBody();
    }

}
