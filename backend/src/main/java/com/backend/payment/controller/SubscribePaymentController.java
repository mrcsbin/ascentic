package com.backend.payment.controller;

import com.backend.member.dto.CustomerKeyDto;
import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.payment.automation.AutomaticPayments;
import com.backend.payment.dto.BillingKeyResponseDto;
import com.backend.payment.dto.SubscribeCard;
import com.backend.payment.entity.SubscribePayment;
import com.backend.payment.entity.SubscribePaymentReceipt;
import com.backend.payment.repository.SubscribePaymentReceiptRepository;
import com.backend.payment.repository.SubscribePaymentRepository;
import com.backend.payment.service.SubscribePaymentServiceImpl;
import com.backend.subscribemember.entity.SubscribeMember;
import com.backend.subscribemember.repository.SbMemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class SubscribePaymentController {

    private final SubscribePaymentRepository subscribePaymentRepository;
    private final SubscribePaymentServiceImpl subscribePaymentService;
    private final MemberRepository memberRepository;
    private final SbMemberRepository sbMemberRepository;
    private final SubscribePaymentReceiptRepository subscribePaymentReceiptRepository;
    private RestTemplate restTemplate = new RestTemplate();

    private final AutomaticPayments automaticPayments;



    @GetMapping("/subscribePayment/getCustomerKey")
    public CustomerKeyDto getCustomerKey() {

        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        String customerKey = UUID.randomUUID().toString();

        SubscribePayment subscribePayment = SubscribePayment.builder()
                .customerKey(customerKey)
                .memberId(currentMemberId)
                .build();

//        System.out.println("76번째 줄++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
//        System.out.println(subscribePayment.toString());

        subscribePaymentRepository.save(subscribePayment);

        return CustomerKeyDto.builder()
                .customerKey(customerKey)
                .build();
    }


    @GetMapping("/billingAuthSuccess")
    public ResponseEntity<Object> handleSuccess(@RequestParam("customerKey") String customerKey,
                                                @RequestParam("authKey") String authKey) {
        RestTemplate restTemplate = new RestTemplate();

        // POST 요청을 보낼 URL
        String url = "https://api.tosspayments.com/v1/billing/authorizations/issue";

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==");

        // 받은 데이터를 Map에 넣음
        Map<String, String> bodyParams = new HashMap<>();
        bodyParams.put("customerKey", customerKey);
        bodyParams.put("authKey", authKey);

        // HttpEntity 설정
        HttpEntity<Map<String, String>> request = new HttpEntity<>(bodyParams, headers);

        // RestTemplate을 사용해 POST 요청을 보냄
        ResponseEntity<BillingKeyResponseDto> response = restTemplate.postForEntity(url, request, BillingKeyResponseDto.class);

        SubscribeCard subscribeCard = SubscribeCard.builder()
                .issuerCode(response.getBody().getCard().getIssuerCode())
                .acquirerCode(response.getBody().getCard().getAcquirerCode())
                .number(response.getBody().getCard().getNumber())
                .cardType(response.getBody().getCard().getCardType())
                .ownerType(response.getBody().getCard().getOwnerType())
                .build();


        //subscribePayment 엔티티에 billingkey 저장
        SubscribePayment subscribePayment = subscribePaymentRepository.findByCustomerKey(customerKey);
        String memberId =subscribePayment.getMemberId();
        SubscribeMember subscribeMember = sbMemberRepository.getLastSbMemberByMemberId(memberId);

        Member member = memberRepository.findEmailById(memberId).get();

        subscribePayment.setBillingKey(response.getBody().getBillingKey());
//        subscribePayment.setOrderId(UUID.randomUUID().toString());
        subscribePayment.setCustomerEmail(member.getEmail());
        subscribePayment.setSubscribeCard(subscribeCard);
        subscribePayment.setAmount(subscribeMember.getSbPrice());
        subscribePayment.setAuthenticatedTime(response.getBody().getAuthenticatedAt());

        subscribePaymentRepository.save(subscribePayment);

        // 빌링키 넣어서 찐 결제 보내는 url~
        String billingUrl = "https://api.tosspayments.com/v1/billing/" + subscribePayment.getBillingKey();

        RestTemplate billingRestTemplate = new RestTemplate();

        // 헤더에 토스 제공 키 넣어줌~~
        HttpHeaders billingHeader = new HttpHeaders();
        billingHeader.setContentType(MediaType.APPLICATION_JSON);
        billingHeader.set("Authorization", "Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==");

        //바디에 넣을 토스 포맷 json 데이터임~~~
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("customerKey", subscribePayment.getCustomerKey());
        jsonObject.put("orderId", UUID.randomUUID().toString());
        jsonObject.put("memberID", subscribePayment.getMemberId());
        jsonObject.put("customerEmail", subscribePayment.getCustomerEmail());
        jsonObject.put("subscribeCard", subscribePayment.getSubscribeCard());
        jsonObject.put("amount", subscribePayment.getAmount());
        jsonObject.put("authenticatedTime", subscribePayment.getAuthenticatedTime());
        jsonObject.put("orderName", subscribeMember.getTasteResult());

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
                        .memberId(memberId)
                        .orderId(orderId)
                        .paymentCompletionDate(paymentCompletionDate)
                        .paymentKey(paymentKey)
                        .build();
                subscribePaymentReceiptRepository.save(subscribePaymentReceipt);
        } catch (JsonProcessingException e) {
                e.printStackTrace();

            }
        }

        HttpHeaders redirectHeaders = new HttpHeaders();

//        URI location = UriComponentsBuilder.fromUriString("http://localhost:3000/exp/subsmanage")
//                .build()
//                .toUri();
        URI location = UriComponentsBuilder.fromUriString("http://localhost:3000/exp/subsmanage")
                .queryParam("success", "구독신청에 성공하셨습니다!")
                .build()
                .toUri();

        redirectHeaders.add("success", "구독신청에 성공하였습니다잇!");
        redirectHeaders.setLocation(location);
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .headers(redirectHeaders)
                .build();
    }

}





