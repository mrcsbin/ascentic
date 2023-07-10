package com.backend.subscribemember.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.payment.entity.SubscribePayment;
import com.backend.payment.repository.SubscribePaymentRepository;
import com.backend.subscribemember.dto.LastSbMemberDTO;
import com.backend.subscribemember.dto.SubscribeMemberDto;
import com.backend.subscribemember.entity.SubscribeMember;
import com.backend.subscribemember.repository.SbMemberRepository;
import com.backend.subscribesend.entity.SubscribeSend;
import com.backend.subscribesend.repository.SubscribeSendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class SbMemberServiceImpl implements SbMemberService {

    private final SbMemberRepository sbMemberRepository;
    private final SubscribePaymentRepository subscribePaymentRepository;
    private final SubscribeSendRepository subscribeSendRepository;

    @Override
    public void sbMemberAdd(SubscribeMemberDto subscribeMemberDto) {

        // 토큰으로 멤버 가져옴
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
//        Member memberNow = this.memberRepository.findById(currentMemberId).orElse(null);

        // 구독회원 빌드
        SubscribeMember subscribeMember = SubscribeMember.builder()
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
                .memberId(currentMemberId)
                .build();

        //  저장
        sbMemberRepository.save(subscribeMember);
    }

    @Override
    public LastSbMemberDTO getLastSbMemberByMemberId() {

        // 토큰으로 멤버아이디 가져옴
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        // 멤버 아이디로 마지막 구독정보 가져옴
        SubscribeMember lastSbMemberByMemberId = sbMemberRepository.getFirstByMemberIdOrderBySbStartDateDesc(currentMemberId);
        SubscribeMember firstSbMemberByMemberId = sbMemberRepository.getFirstByMemberIdOrderBySbStartDateAsc(currentMemberId);
        SubscribePayment lastSubscribePayment = subscribePaymentRepository.findFirstByMemberIdOrderBySubscribePaymentNumDesc(currentMemberId);
        System.out.println("+++++++++++++++++++++++++++++++++++++++++");
        System.out.println(lastSubscribePayment);
        LastSbMemberDTO lastSbMemberDTO = LastSbMemberDTO.builder()
                .sbStartDate(lastSbMemberByMemberId.getSbStartDate())
                .sbEndDate(lastSbMemberByMemberId.getSbEndDate())
                .theFirstSbStartDate(firstSbMemberByMemberId.getSbStartDate())
                .sbPay(lastSubscribePayment.getSubscribeCard())
                .sbPaymentDay(lastSbMemberByMemberId.getSbPaymentDay())
                .memberName(lastSbMemberByMemberId.getSbMemberName())
                .mainAddress(lastSbMemberByMemberId.getSbMainAddr())
                .subAddress(lastSbMemberByMemberId.getSbSubAddr())
                .tasteResult(lastSbMemberByMemberId.getTasteResult())
                .build();
        return lastSbMemberDTO;
    }


    public SubscribeMember findSbMember(Integer id) {
        SubscribeMember byId = sbMemberRepository.findById(id).orElse(null);
        return byId;
    }

    public void endSubscription() {
        // 토큰으로 멤버아이디 가져옴
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        //  구독 진행중인 데이터 가져옴
        SubscribeMember lastSbMemberByMemberId = sbMemberRepository.getFirstByMemberIdOrderBySbStartDateDesc(currentMemberId);

        //  구독종료일 업데이트
        LocalDate today = LocalDate.now();
        lastSbMemberByMemberId.setSbEndDate(today);
        sbMemberRepository.save(lastSbMemberByMemberId);

    }

    public boolean isSubscribeMember() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        return sbMemberRepository.existsByMemberIdAndSbEndDateIsNull(currentMemberId);
    }

    @Override
    public boolean isSubscribeUseMonth() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Boolean res;

        SubscribeMember lastSbMember = sbMemberRepository.getLastSbMemberByMemberId(currentMemberId);

        if(lastSbMember == null)
            return false;

        SubscribeSend subscribeSend = subscribeSendRepository.findTopBySubscribeMemberOrderBySbSendNumDesc(lastSbMember);

        if(subscribeSend == null)
            return false;

        res = subscribeSend.getSbSendPayDate().getYear() == LocalDate.now().getYear()
                && subscribeSend.getSbSendPayDate().getMonthValue() == LocalDate.now().getMonthValue();
        return res;
    }


}
