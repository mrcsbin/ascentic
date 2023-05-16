package com.backend.subscribeMember;

import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
                .sbStartDate(subscribeMemberDto.getStartDate())
                .sbEndDate(subscribeMemberDto.getEndDate())
                .sbMemberName(subscribeMemberDto.getMemberName())
                .sbMemberTel(subscribeMemberDto.getMemberTel())
                .sbMainAddr(subscribeMemberDto.getMainAddress())
                .sbSubAddr(subscribeMemberDto.getSubAddress())
                .sbShipMessage(subscribeMemberDto.getShipMessage())
                .sbPay(subscribeMemberDto.getPaymentMethod())
                .sbPaymentDay(subscribeMemberDto.getMonthPaymentDate())
                .sbPrice(subscribeMemberDto.getPrice())
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
