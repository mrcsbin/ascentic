package com.backend.subscribesend;


import com.backend.member.service.MemberServiceImpl;

import com.backend.subscribesend.service.SubscribeSendServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SubscribeSendTest {

    @Autowired
    private SubscribeSendServiceImpl sendService;

    @Autowired
    private MemberServiceImpl memberService;



//    @Test
//    public void insertSubsSend(){
//
//        SubsSendInsertDTO subsSendInsertDTO = SubsSendInsertDTO.builder()
//                .sbMemberNum()
//                .spNum()
//                .build();
//
//        sendService.insertSubsSend(subsSendInsertDTO);
//
//        assertEquals( , );
//    }
//    @Test
//    public void insertSubsReview(){
//
//        SubsReviewDTO subsReviewDTO = SubsReviewDTO.builder()
//                .build();
//
//    }
//
//    @Test
//    public void getSubs(){
//
//        LoginDto loginDto = new LoginDto();
//        loginDto.setId("guswn4921");
//        loginDto.setPassword("guswn4921!");
//
//        JwtTokenDto token = memberService.doLogin(loginDto);
//
//
//    }
}
