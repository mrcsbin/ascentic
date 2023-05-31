//package com.backend.payment.automation;
//
//import com.backend.payment.entity.SubscribePayment;
//import com.backend.payment.repository.SubscribePaymentRepository;
//import com.backend.subscribemember.entity.SubscribeMember;
//import com.backend.subscribemember.repository.SbMemberRepository;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.Month;
//import java.util.List;
//
//@Component
//public class AutomaticPayments {
//    private final SbMemberRepository sbMemberRepository;
//    private final SubscribePaymentRepository subscribePaymentRepository;
//
//    public AutomaticPayments(SbMemberRepository sbMemberRepository, SubscribePaymentRepository subscribePaymentRepository) {
//        this.sbMemberRepository = sbMemberRepository;
//        this.subscribePaymentRepository = subscribePaymentRepository;
//    }
//
//
//    @Scheduled(cron = "0 0 10 * * ?")
//        public void executeAtSpecificTime() {
//            // 여기에 매일 새벽 3시에 실행할 코드를 작성하십시오.
//            // 1. sbMember에서 endDate 없음  + sbPaymentDay가 오늘임   //전체 데이터
//            //
//            // 2 sbMember의 memberId 와 tasteResult를 뽑은 후
//                // MemberId로~
//                // 2-1.receipt의 마지막 결제 날짜 확인
//                // 2-1-1:
//                // 2-2.SubscribePayment 조회
//                //
//            // 3.
//
////        jsonObject.put("customerKey", subscribePayment.getCustomerKey());
////        jsonObject.put("orderId", subscribePayment.getOrderId());
////        jsonObject.put("memberID", subscribePayment.getMemberID());
////        jsonObject.put("customerEmail", subscribePayment.getCustomerEmail());
////        jsonObject.put("subscribeCard", subscribePayment.getSubscribeCard());
////        jsonObject.put("amount", subscribePayment.getAmount());
////        jsonObject.put("authenticatedTime", subscribePayment.getAuthenticatedTime());
////        jsonObject.put("orderName", subscribeMember.getTasteResult());
//        //
//
//
//
//
//
//        }
//
//
//
//
//
//    public void AutoPaymentService(SbMemberRepository sbMemberRepository, SubscribePaymentRepository subscribePaymentRepository) {
//        this.sbMemberRepository = sbMemberRepository;
//        this.subscribePaymentRepository = subscribePaymentRepository;
//    }
//
//    public void processAutoPayment() {
//        // 1. 현재 날짜를 얻어오고 오늘의 일(day) 값을 가져옵니다.
//        LocalDate currentDate = LocalDate.now();
//        int currentDay = currentDate.getDayOfMonth();
//
//        // 2. SubscribeMember 엔티티에서 paymentDay가 오늘의 일(day)과 일치하고, sbEndDate가 null인 데이터를 조회합니다.
//        List<SubscribeMember> membersToAutoPay = sbMemberRepository.findBySbPaymentDayAndSbEndDateIsNull(currentDay);
//
//        // 3. 조회된 SubscribeMember 목록을 순회하면서 각 회원의 memberId를 사용하여 SubscribePayment 엔티티에서 해당 회원의 paymentCompletionDate 값을 조회합니다.
//        for (SubscribeMember member : membersToAutoPay) {
//            String memberId = member.getMemberId();
//            List<SubscribePayment> payments = subscribePaymentRepository.findByMemberId(memberId);
//
//            // 4. paymentCompletionDate가 이번 달에 없는 경우에는 자동 결제 로직을 수행합니다.
//            if (!isPaymentCompletedThisMonth(payments, currentDate.getMonth())) {
//                performAutoPayment(member);
//            }
//        }
//    }
//
//    private boolean isPaymentCompletedThisMonth(List<SubscribePayment> payments, Month currentMonth) {
//        for (SubscribePayment payment : payments) {
//            LocalDateTime completionDate = payment.getPaymentCompletionDate();
//            if (completionDate != null && completionDate.getMonth() == currentMonth) {
//                return true;
//            }
//        }
//        return false;
//    }
//
//    private void performAutoPayment(SubscribeMember member) {
//        // 자동 결제 로직을 구현하세요.
//        // 예를 들어, 결제를 수행하는 메소드를 호출하거나 결제에 필요한 데이터를 생성하는 등의 작업을 수행합니다.
//    }
//}
//
//
//
//}
