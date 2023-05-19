package com.backend.subscribeMember;

import com.backend.member.repository.MemberRepository;
import com.backend.subscribeMember.repository.SbMemberRepository;
import com.backend.subscribeMember.service.SbMemberServiceImpl;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.mock;

@SpringBootTest
public class testSubscribeMember {

    SbMemberServiceImpl sbMemberService = new SbMemberServiceImpl(mock(SbMemberRepository.class),mock(MemberRepository.class));


//    TasteServiceImpl tasteService = new TasteServiceImpl
//            (mock(TasteRepository.class), mock(TasteResRepository.class));
//    @Test
//    public void testAdd(){
//        SubscribeMember subscribeMember = new SubscribeMember();
//        subscribeMember.setSbMemberNum(22);
//        sbMemberService.sbMemberAdd(subscribeMember);
//
//        assertThat(22).isEqualTo(sbMemberService.findSbMember(22).getSbMemberNum());
//    }
}
