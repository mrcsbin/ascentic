package com.backend.subscribeMember;



import com.backend.cart.Cart;
import com.backend.cart.CartDTO;
import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SbMemberServiceImpl implements SbMemberService {

    private final SbMemberRepository sbMemberRepository;
    private final MemberRepository memberRepository;

    @Override
    public void sbMemberAdd(SubscribeMemberDto subscribeMemberDto) {

        // 토큰으로 멤버 가져옴
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member memberNow = this.memberRepository.findById(currentMemberId).orElse(null);

        // 구독회원 빌드
        SubscribeMember subscribeMember = SubscribeMember.builder()
                .member(memberNow)
                .sbStartDate(subscribeMemberDto.getSbStartDate())
                .sbEndDate(subscribeMemberDto.getSbEndDate())
                .sbPeriod(subscribeMemberDto.getSbPeriod())
                .sbPay(subscribeMemberDto.getSbPay())
                .sbPaymentDay(subscribeMemberDto.getSbPaymentDay())
                .tasteResult(subscribeMemberDto.getTasteResult())
                .build();

        //  저장
        sbMemberRepository.save(subscribeMember);
    }

    @Override
    public LastSbMemberDTO getLastSbMemberByMemberId() {

        // 토큰으로 멤버아이디 가져옴
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member member = memberRepository.findById(currentMemberId).orElse(null);

        // 멤버 아이디로 마지막 구독정보 가져옴
        SubscribeMember lastSbMemberByMemberId = sbMemberRepository.getLastSbMemberByMemberId(currentMemberId);
        LastSbMemberDTO lastSbMemberDTO = LastSbMemberDTO.builder()
                .sbStartDate(lastSbMemberByMemberId.getSbStartDate())
                .sbEndDate(lastSbMemberByMemberId.getSbEndDate())
                .sbPay(lastSbMemberByMemberId.getSbPay())
                .sbPaymentDay(lastSbMemberByMemberId.getSbPaymentDay())
                .memberName(member.getName())
                .build();
        return lastSbMemberDTO;
    }


    public SubscribeMember findSbMember(Integer id){
        SubscribeMember byId = sbMemberRepository.findById(id).orElse(null);
        return byId;
    }

    public void endSubscription(){
        // 토큰으로 멤버아이디 가져옴
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member memberNow = this.memberRepository.findById(currentMemberId).orElse(null);

        //  구독 진행중인 데이터 가져옴
        SubscribeMember lastSbMemberByMemberId = sbMemberRepository.getLastSbMemberByMemberId(currentMemberId);

        //  구독종료일 업데이트
        LocalDate today = LocalDate.now();
        lastSbMemberByMemberId.setSbEndDate(today);
        sbMemberRepository.save(lastSbMemberByMemberId);

    }
}
