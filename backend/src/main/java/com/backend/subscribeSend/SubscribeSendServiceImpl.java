package com.backend.subscribeSend;

import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.order.AddressDTO;
import com.backend.order.Order;
import com.backend.subscribeMember.SubscribeMember;
import com.backend.subscribeMember.SubscribeMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SubscribeSendServiceImpl implements SubscribeSendService{

    private final SubscribeSendRepository subscribeSendRepository;
    private final MemberRepository memberRepository;
    private final SubscribeMemberRepository subscribeMemberRepository;
    @Override
    public void insertSubsReview(SubsReviewDTO subsReviewDTO){
        subscribeSendRepository.updateReview(subsReviewDTO);
    }

    @Override
    public List<SubsSendDTO> getSubs(){
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        //예전 구독상품에 대해서는 조회 불가. 탭따로만들거나 없는 기능으로
        //구독멤버레퍼지토리에 SubscribeMember findByMember(Member member); 추가;
        SubscribeMember subsMember = subscribeMemberRepository
                .findByMember(memberRepository.findById(currentMemberId).orElse(null));

        List<SubscribeSend> subslist = subscribeSendRepository
                .findAllBySubscribeMember(subsMember);

        List<SubsSendDTO> subsDTOlist = new ArrayList<>();

        for (SubscribeSend subssend : subslist) {
            SubsSendDTO subsSendDTO = SubsSendDTO.builder()
                    .sbSendNum(subssend.getSbSendNum())
                    .sbStartDate(subssend.getSubscribeMember().getSbStartDate())
                    .sbEndDate(subssend.getSubscribeMember().getSbEndDate())
                    .sbPeriod(subssend.getSubscribeMember().getSbPeriod())
                    .sbPay(subssend.getSubscribeMember().getSbPay())
                    .sbPaymentDay(subssend.getSubscribeMember().getSbPaymentDay())
                    .tasteResult(subssend.getSubscribeMember().getTasteResult())
                    .spScent(subssend.getSbSubscribeProduct().getSpScent())
                    .spPrice(subssend.getSbSubscribeProduct().getSpPrice())
                    .spIntro(subssend.getSbSubscribeProduct().getSpIntro())
                    .sbSendStart(subssend.getSbSendStart())
                    .sbSendEnd(subssend.getSbSendEnd())
                    .sbSendPostcode(subssend.getSbSendPostcode())
                    .sbSendScore(subssend.getSbSendScore())
                    .sbSendReview(subssend.getSbSendReview())
                    .sbSendPayDate(subssend.getSbSendPayDate())
                    .build();
            subsDTOlist.add(subsSendDTO);
        }
        return subsDTOlist;
    }
}
