package com.backend.subscribeSend;

import com.backend.MessageAndMail.MailController;
import com.backend.member.dto.JwtTokenDto;
import com.backend.member.dto.LoginDto;
import com.backend.member.jwt.JwtTokenProvider;
import com.backend.member.repository.MemberRepository;
import com.backend.member.service.MemberServiceImpl;
import com.backend.subscribeMember.SubscribeMemberRepository;
import com.backend.subscribeProduct.SubscribeProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.mock;
import static org.junit.jupiter.api.Assertions.assertEquals;

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
