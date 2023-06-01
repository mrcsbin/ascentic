package com.backend.payment.service;

import com.backend.payment.entity.SubscribePayment;
import com.backend.payment.entity.SubscribePaymentReceipt;
import com.backend.payment.repository.SubscribePaymentReceiptRepository;
import com.backend.payment.repository.SubscribePaymentRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@Service
public class SubscribePaymentServiceImpl implements SubscribePaymentService{
    SubscribePaymentRepository subscribePaymentRepository;
    private final SubscribePaymentReceiptRepository subscribePaymentReceiptRepository;

    public void insertSubscribePayment(SubscribePayment subscribePayment){
        subscribePaymentRepository.save(subscribePayment);
    }


    public ResponseEntity<Object> performSubscribePayment(SubscribePayment subscribePayment, String tasteRes) {
        // 빌링키 넣어서 찐 결제 보내는 url~

        String billingUrl = "https://api.tosspayments.com/v1/billing/"+subscribePayment.getBillingKey();

        RestTemplate billingRestTemplate = new RestTemplate();

        // 헤더에 토스 제공 키 넣어줌~~
        HttpHeaders billingHeader = new HttpHeaders();
        billingHeader.setContentType(MediaType.APPLICATION_JSON);
        billingHeader.set("Authorization", "Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==");

        //바디에 넣을 토스 포맷 json 데이터임~~~
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("customerKey", subscribePayment.getCustomerKey());
        jsonObject.put("orderId", subscribePayment.getOrderId());
        jsonObject.put("memberID", subscribePayment.getMemberId());
        jsonObject.put("customerEmail", subscribePayment.getCustomerEmail());
        jsonObject.put("subscribeCard", subscribePayment.getSubscribeCard());
        jsonObject.put("amount", subscribePayment.getAmount());
        jsonObject.put("authenticatedTime", subscribePayment.getAuthenticatedTime());
        jsonObject.put("orderName", tasteRes);

        //json 형식으로 final 결제 요청 보냄
        HttpEntity<String> billingRequest =
                new HttpEntity<>(jsonObject.toString(), billingHeader);

        //결괏값 받아옴~~~~~
        ResponseEntity<String> billingResponse = billingRestTemplate
                .exchange(billingUrl, HttpMethod.POST, billingRequest, String.class, "billingKey");

        // 제대로 성공하면 subsManage 기릿요
        if(billingResponse.getStatusCode() == HttpStatus.OK) {


            String responseBody = billingResponse.getBody(); // JSON 형식의 응답 데이터

            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode jsonNode = objectMapper.readTree(responseBody);
                String orderId = jsonNode.get("orderId").asText();
                String paymentCompletionDate = jsonNode.get("requestedAt").asText();
                String paymentKey = jsonNode.get("paymentKey").asText();

                // SubscribePaymentReceipt 객체 생성
                SubscribePaymentReceipt subscribePaymentReceipt = SubscribePaymentReceipt.builder()
                        .memberId(subscribePayment.getMemberId())
                        .orderId(orderId)
                        .paymentCompletionDate(paymentCompletionDate)
                        .paymentKey(paymentKey)
                        .build();
                System.out.println("시바");
                System.out.println(subscribePaymentReceipt);
                subscribePaymentReceiptRepository.save(subscribePaymentReceipt);
            } catch (JsonProcessingException e) {
                e.printStackTrace();

            }

        }

        HttpHeaders redirectHeaders = new HttpHeaders();

            URI location = UriComponentsBuilder.fromUriString("http://localhost:3000/exp/subsmanage")
                    .queryParam("success", true)
                    .build()
                    .toUri();

//
//        redirectHeaders.add("alertMessage", "구독신청에 성공하였습니다잇!");
        redirectHeaders.setLocation(location);
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .headers(redirectHeaders)
                .build();
    }


}
