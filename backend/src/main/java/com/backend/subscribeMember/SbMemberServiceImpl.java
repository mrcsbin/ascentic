package com.backend.subscribeMember;



import com.backend.cart.Cart;
import com.backend.cart.CartDTO;
import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public SubscribeMember findSbMember(Integer id){
        SubscribeMember byId = sbMemberRepository.findById(id).orElse(null);
        return byId;
    }
}
