package com.backend.MessageAndMail.controller;

import com.backend.MessageAndMail.SmsApiInfo;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SmsCertificateController {
    private final SmsApiInfo smsApiInfo;
    private final DefaultMessageService messageService;
    private final RedisTemplate<String, String> redisTemplate;

    public SmsCertificateController(SmsApiInfo smsApiInfo, RedisTemplate<String, String> redisTemplate) {
        this.smsApiInfo = smsApiInfo;
        this.redisTemplate = redisTemplate;

        String INSERT_API_KEY = smsApiInfo.getKey();
        String INSERT_API_SECRET_KEY = smsApiInfo.getSecret();
        this.messageService = NurigoApp.INSTANCE.initialize(INSERT_API_KEY, INSERT_API_SECRET_KEY, "https://api.coolsms.co.kr");
    }


    /**
     * 단일 메시지 발송 예제
     */
@PostMapping("/send-one")
    public SingleMessageSentResponse sendOne(String phoneNumber) {
    System.out.println(phoneNumber);
        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01074152889");
        message.setTo(phoneNumber);
        String storedCode = redisTemplate.opsForValue().get(phoneNumber + ":code");
        message.setText("인증번호는 " + storedCode + "입니다.");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);

        return response;
    }



    /**
     * 여러 메시지 발송 예제
     * 한 번 실행으로 최대 10,000건 까지의 메시지가 발송 가능합니다.
     */
//    @PostMapping("/send-many")
//    public MultipleDetailMessageSentResponse sendMany() {
//        ArrayList<Message> messageList = new ArrayList<>();
//
//        for (int i = 0; i < 3; i++) {
//            Message message = new Message();
//            // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
//            message.setFrom("발신번호 입력");
//            message.setTo("수신번호 입력");
//            message.setText("한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 추가됩니다." + i);
//
//            // 메시지 건건 마다 사용자가 원하는 커스텀 값(특정 주문/결제 건의 ID를 넣는등)을 map 형태로 기입하여 전송 후 확인해볼 수 있습니다!
//            /*HashMap<String, String> map = new HashMap<>();
//
//            map.put("키 입력", "값 입력");
//            message.setCustomFields(map);
//
//            messageList.add(message);*/
//        }
//
//        try {
//            // send 메소드로 단일 Message 객체를 넣어도 동작합니다!
//            // 세 번째 파라미터인 showMessageList 값을 true로 설정할 경우 MultipleDetailMessageSentResponse에서 MessageList를 리턴하게 됩니다!
//            MultipleDetailMessageSentResponse response = this.messageService.send(messageList, false, true);
//
//            // 중복 수신번호를 허용하고 싶으실 경우 위 코드 대신 아래코드로 대체해 사용해보세요!
//            //MultipleDetailMessageSentResponse response = this.messageService.send(messageList, true);
//
//            System.out.println(response);
//
//            return response;
//        } catch (NurigoMessageNotReceivedException exception) {
//            System.out.println(exception.getFailedMessageList());
//            System.out.println(exception.getMessage());
//        } catch (Exception exception) {
//            System.out.println(exception.getMessage());
//        }
//        return null;
//    }




//    /**
//     * 잔액 조회 예제
//     */
//    @GetMapping("/get-balance")
//    public Balance getBalance() {
//        Balance balance = this.messageService.getBalance();
//        System.out.println(balance);
//
//        return balance;
//    }

    /**
     * 메시지 조회 예제
     */
//    @GetMapping("/get-message-list")
//    public MessageListResponse getMessageList() {
//        // 검색 조건이 있는 경우에 MessagListRequest를 초기화 하여 getMessageList 함수에 파라미터로 넣어서 검색할 수 있습니다!.
//        // 수신번호와 발신번호는 반드시 -,* 등의 특수문자를 제거한 01012345678 형식으로 입력해주셔야 합니다!
//        MessageListRequest request = new MessageListRequest();
//
//        // 검색할 건 수, 값 미지정 시 20건 조회, 최대 500건 까지 설정 가능
//        // request.setLimit(1);
//
//        // 조회 후 다음 페이지로 넘어가려면 조회 당시 마지막의 messageId를 입력해주셔야 합니다!
//        // request.setStartKey("메시지 ID");
//
//        // request.setTo("검색할 수신번호");
//        // request.setFrom("검색할 발신번호");
//
//        // 메시지 상태 검색, PENDING은 대기 건, SENDING은 발송 중,COMPLETE는 발송완료, FAILED는 발송에 실패한 모든 건입니다.
//        /*
//        request.setStatus(MessageStatusType.PENDING);
//        request.setStatus(MessageStatusType.SENDING);
//        request.setStatus(MessageStatusType.COMPLETE);
//        request.setStatus(MessageStatusType.FAILED);
//        */
//
//        // request.setMessageId("검색할 메시지 ID");
//
//        // 검색할 메시지 목록
//        /*
//        ArrayList<String> messageIds = new ArrayList<>();
//        messageIds.add("검색할 메시지 ID");
//        request.setMessageIds(messageIds);
//         */
//
//        // 조회 할 메시지 유형 검색, 유형에 대한 값은 아래 내용을 참고해주세요!
//        // SMS: 단문
//        // LMS: 장문
//        // MMS: 사진문자
//        // ATA: 알림톡
//        // CTA: 친구톡
//        // CTI: 이미지 친구톡
//        // NSA: 네이버 스마트알림
//        // RCS_SMS: RCS 단문
//        // RCS_LMS: RCS 장문
//        // RCS_MMS: RCS 사진문자
//        // RCS_TPL: RCS 템플릿문자
//        // request.setType("조회 할 메시지 유형");
//
//        MessageListResponse response = this.messageService.getMessageList(request);
//        System.out.println(response);
//
//        return response;
    }


