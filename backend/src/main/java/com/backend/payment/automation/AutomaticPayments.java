package com.backend.payment.automation;

import com.backend.payment.entity.SubscribePayment;
import com.backend.payment.entity.SubscribePaymentReceipt;
import com.backend.payment.repository.SubscribePaymentRepository;
import com.backend.payment.service.SubscribePaymentServiceImpl;
import com.backend.subscribemember.entity.SubscribeMember;
import com.backend.subscribemember.repository.SbMemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.OffsetDateTime;
import java.util.List;

@Component
@AllArgsConstructor
public class AutomaticPayments {
    private final SbMemberRepository sbMemberRepository;
    private final SubscribePaymentRepository subscribePaymentRepository;
    private SubscribePaymentServiceImpl subscribePaymentService;

//    public AutomaticPayments(SbMemberRepository sbMemberRepository, SubscribePaymentRepository subscribePaymentRepository) {
//        this.sbMemberRepository = sbMemberRepository;
//        this.subscribePaymentRepository = subscribePaymentRepository;
//    }


//    @Scheduled(cron = "0 14 15 * * *") //매년 매월 매일 15시 10분 0초에 결제
        public void executeAtSpecificTime() {

//             여기에 매일 아침 10시에 실행할 코드를 작성하십시오.
//             1. sbMember에서 endDate 없음  + sbPaymentDay가 오늘임   //전체 데이터
//
//             2 sbMember의 memberId 와 tasteResult를 뽑은 후
//                 MemberId로~
//                 2-1.receipt의 마지막 결제 날짜 확인
//                 2-1-1:
//                 2-2.SubscribePayment 조회
//
//             3.


//        jsonObject.put("customerKey", subscribePayment.getCustomerKey());
//        jsonObject.put("orderId", subscribePayment.getOrderId());
//        jsonObject.put("memberID", subscribePayment.getMemberID());
//        jsonObject.put("customerEmail", subscribePayment.getCustomerEmail());
//        jsonObject.put("subscribeCard", subscribePayment.getSubscribeCard());
//        jsonObject.put("amount", subscribePayment.getAmount());
//        jsonObject.put("authenticatedTime", subscribePayment.getAuthenticatedTime());
//        jsonObject.put("orderName", subscribeMember.getTasteResult());
        //


        }
//    @Scheduled(cron = "0 36 15 * * *") //매년 매월 매일 15시 10분 0초에 결제
    public void processAutoPayment() {
        // 1. 현재 날짜를 얻어오고 오늘의 일(day) 값을 가져옵니다.
        LocalDate currentDate = LocalDate.now();
        int currentDay = currentDate.getDayOfMonth();

        // 2. SubscribeMember 엔티티에서 paymentDay가 오늘의 일(day)과 일치하고, sbEndDate가 null인 데이터를 조회합니다.
        List<SubscribeMember> membersToAutoPay = sbMemberRepository.findBySbPaymentDayAndSbEndDateIsNull(currentDay);

        // 3. 조회된 SubscribeMember 목록을 순회하면서 각 회원의 memberId를 사용하여 SubscribePayment 엔티티에서 해당 회원의 paymentCompletionDate 값을 조회합니다.
        for (SubscribeMember member : membersToAutoPay) {
            String memberId = member.getMemberId();
            System.out.println("이거 멤버 Id 임~~~~");
            System.out.println(memberId);

            //payments 에서 가장 최신의 결제 정보 => 가장 최근 구독 정보 가져오기
            SubscribePayment payment = subscribePaymentRepository.findFirstByMemberIdOrderBySubscribePaymentNumDesc(memberId); // 한 멤버의 모든 구독결제정보 가져오기
            System.out.println("이거 payment 임~~~~");
            System.out.println(payment.toString());

            // 4. paymentCompletionDate가 이번 달에 없는 경우에는 자동 결제 로직을 수행합니다.
            if (!isPaymentCompletedThisMonth(payment, currentDate.getMonth())) {

                System.out.println("autopayment 90번째 줄~~~~~~~~~~~~~~~~~~~~~~~~");
                String tasteRes = member.getTasteResult();
                subscribePaymentService.performSubscribePayment(payment,tasteRes);
            }
        }
    }

    private boolean isPaymentCompletedThisMonth(SubscribePayment payment, Month currentMonth) {

            OffsetDateTime completionDate = OffsetDateTime.parse(payment.getAuthenticatedTime());
        System.out.println("C바");
        System.out.println(completionDate);
        System.out.println(completionDate.getMonth());
        System.out.println(currentMonth);
            if (completionDate != null && (completionDate.getMonth() == currentMonth)) {
                return true;
            }
        else{
        return false;}
    }

   
}



