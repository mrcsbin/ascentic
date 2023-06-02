package com.backend.subscribesend.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.scent.entity.Scent;
import com.backend.scent.repository.ScentRepository;
import com.backend.subscribemember.repository.SbMemberRepository;
import com.backend.subscribemember.entity.SubscribeMember;
import com.backend.subscribeproduct.entity.SubscribeProduct;
import com.backend.subscribeproduct.repository.SbProductRepository;
import com.backend.subscribesend.dto.SubsReviewDTO;
import com.backend.subscribesend.dto.SubsSendDTO;
import com.backend.subscribesend.dto.SubsSendInsertDTO;
import com.backend.subscribesend.dto.admin.AdminSbSendUpdateDto;
import com.backend.subscribesend.dto.admin.AdminSendDto;
import com.backend.subscribesend.dto.admin.SbMemberRecord;
import com.backend.subscribesend.entity.SubscribeSend;
import com.backend.subscribesend.repository.SubscribeSendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SubscribeSendServiceImpl implements SubscribeSendService{

    private final SubscribeSendRepository subscribeSendRepository;
    private final SbMemberRepository sbMemberRepository;
    private final SbProductRepository sbProductRepository;
    private final ScentRepository scentRepository;

    @Override
    public void insertSubsSend(SubsSendInsertDTO subsSendInsertDTO){
        SubscribeSend subscribeSend = SubscribeSend.builder()
                 .subscribeMember(sbMemberRepository.findById(subsSendInsertDTO.getSbMemberNum()).orElse(null))
                .subscribeProduct(sbProductRepository.findById(subsSendInsertDTO.getSpNum()).orElse(null))
                        .build();
        subscribeSendRepository.save(subscribeSend);
    }

    @Override
    public void insertSubsReview(SubsReviewDTO subsReviewDTO) {
        SubscribeSend subscribeSend = subscribeSendRepository.findById(subsReviewDTO.getSbSendNum()).orElse(null);
        subscribeSend.setSbSendReview(subsReviewDTO.getSbSendReview());
        subscribeSend.setSbSendScore(subsReviewDTO.getSbSendScore());

        subscribeSendRepository.save(subscribeSend);
    }


    @Override
    public List<SubsSendDTO> getSubs(){
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        //예전 구독상품에 대해서는 조회 불가. 탭따로만들거나 없는 기능으로
        //구독멤버레퍼지토리에 SubscribeMember findByMember(Member member); 추가;
        SubscribeMember subsMember = sbMemberRepository
                .findTopByMemberId(currentMemberId);

        List<SubscribeSend> subslist = subscribeSendRepository
                .findAllBySubscribeMember(subsMember);

        List<SubsSendDTO> subsDTOlist = new ArrayList<>();

        for (SubscribeSend subssend : subslist) {
            SubsSendDTO subsSendDTO = SubsSendDTO.builder()
                    .sbSendNum(subssend.getSbSendNum())
                    .sbStartDate(subssend.getSubscribeMember().getSbStartDate())
                    .sbEndDate(subssend.getSubscribeMember().getSbEndDate())
                    .sbPay(subssend.getSubscribeMember().getSbPay())
                    .sbPaymentDay(subssend.getSubscribeMember().getSbPaymentDay())
                    .tasteResult(subssend.getSubscribeMember().getTasteResult())
                    .spScent(subssend.getSubscribeProduct().getScentName())
                    .spPrice(subssend.getSubscribeProduct().getSbProdPrice())
                    .spIntro(subssend.getSubscribeProduct().getSbProdIntro())
//                    .sbSendStart(subssend.getSbSendStart())
//                    .sbSendEnd(subssend.getSbSendEnd())
                    .sbSendPostcode(subssend.getSbSendPostcode())
                    .sbSendScore(subssend.getSbSendScore())
                    .sbSendReview(subssend.getSbSendReview())
                    .sbSendPayDate(subssend.getSbSendPayDate())
                    .build();
            subsDTOlist.add(subsSendDTO);
        }
        return subsDTOlist;
    }

    @Override
    public List<AdminSendDto> getAdminSbSend(String sbSendState) {
        List<SubscribeSend> subscribeSends = sbSendState.equals("all") ? subscribeSendRepository.findAll()
                : subscribeSendRepository.findBySbSendState(sbSendState);

        return subscribeSends.stream()
                .map(AdminSendDto::of)
                .collect(Collectors.toList());
    }

    @Override
    public void updateSbSend(AdminSbSendUpdateDto adminSbSendUpdateDto) {
        SubscribeSend subscribeSend = subscribeSendRepository.findById(adminSbSendUpdateDto.getSbSendNum()).orElse(null);
        subscribeSend.adminUpdate(adminSbSendUpdateDto.getSbSendPostcode(),
                sbProductRepository.findById(adminSbSendUpdateDto.getSbProdNum()).orElse(null),
                adminSbSendUpdateDto.getSbShippingCode());

        subscribeSendRepository.save(subscribeSend);
    }

    @Override
    public List<SbMemberRecord> adminGetSbMemberRecord(String memberId, String scentNoteName) {
        List<SubscribeMember> subscribeMembers = sbMemberRepository.findByMemberId(memberId);
        List<SubscribeProduct> subscribeProducts = sbProductRepository.findByScentNameScentNoteName(scentNoteName);
        List<SubscribeSend> subscribeSends = subscribeMembers.stream().
                flatMap(subscribeMember -> subscribeProducts.stream()
                        .map(subscribeProduct -> subscribeSendRepository.findDistinctTopBySubscribeMemberAndSubscribeProduct(subscribeMember,subscribeProduct))
                .filter(Objects::nonNull))
                .collect(Collectors.toList());

        return subscribeSends.stream()
                .map(SbMemberRecord::of)
                .collect(Collectors.toList());
    }
}
