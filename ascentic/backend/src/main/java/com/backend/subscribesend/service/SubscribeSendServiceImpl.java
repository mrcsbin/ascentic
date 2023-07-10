package com.backend.subscribesend.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.scent.repository.ScentRepository;
import com.backend.subscribemember.repository.SbMemberRepository;
import com.backend.subscribemember.entity.SubscribeMember;
import com.backend.subscribeproduct.repository.SbProductRepository;
import com.backend.subscribesend.dto.SubsReviewDTO;
import com.backend.subscribesend.dto.SubsSendDTO;
import com.backend.subscribesend.dto.SubsSendInsertDTO;
import com.backend.subscribesend.dto.SubscribeSendResponse;
import com.backend.subscribesend.dto.admin.AdminSbSendUpdateDto;
import com.backend.subscribesend.dto.admin.AdminSendDto;
import com.backend.subscribesend.entity.SubscribeSend;
import com.backend.subscribesend.repository.SubscribeSendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SubscribeSendServiceImpl implements SubscribeSendService {

    private final SubscribeSendRepository subscribeSendRepository;
    private final SbMemberRepository sbMemberRepository;
    private final SbProductRepository sbProductRepository;

    @Override
    public void insertSubsSend(SubsSendInsertDTO subsSendInsertDTO) {
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
    public List<SubsSendDTO> getSubs() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        //예전 구독상품에 대해서는 조회 불가. 탭따로만들거나 없는 기능으로
        //구독멤버레퍼지토리에 SubscribeMember findByMember(Member member); 추가;
        List<SubscribeMember> subsMember = sbMemberRepository
                .findByMemberId(currentMemberId).get();

        List<SubscribeSend> subslist = new ArrayList<>();

        for(SubscribeMember subscribeMember : subsMember) {
            List<SubscribeSend> subscribeSendList = subscribeSendRepository.findBySubscribeMember(subscribeMember).get();
            for(SubscribeSend subscribeSend : subscribeSendList) {
                subslist.add((subscribeSend));
            }
        }

        List<SubsSendDTO> subsDTOlist = new ArrayList<>();

        for (SubscribeSend subssend : subslist) {
            SubsSendDTO subsSendDTO = SubsSendDTO.builder()
                    .sbSendNum(subssend.getSbSendNum())
                    .sbStartDate(subssend.getSubscribeMember().getSbStartDate())
                    .sbEndDate(subssend.getSubscribeMember().getSbEndDate())
                    .sbPaymentDay(subssend.getSubscribeMember().getSbPaymentDay())
                    .tasteResult(subssend.getSubscribeMember().getTasteResult())
                    .spScent(subssend.getSubscribeProduct().getScentName())
                    .spPrice(subssend.getSubscribeProduct().getSbProdPrice())
                    .spIntro(subssend.getSubscribeProduct().getSbProdIntro())
                    .sbProdImage(subssend.getSubscribeProduct().getSbProdImage())
//                    .sbSendStart(subssend.getSbSendStart())
//                    .sbSendEnd(subssend.getSbSendEnd())
                    .sbSendPostcode(subssend.getSbSendPostcode())
                    .sbSendScore(subssend.getSbSendScore())
                    .sbSendReview(subssend.getSbSendReview())
                    .sbSendPayDate(subssend.getSbSendPayDate())
                    .sbSendPayment(subssend.getSbSendPayment())
                    .sbShippingCode(subssend.getSbShippingCode())
                    .sbSendState(subssend.getSbSendState())
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
        subscribeSend.adminUpdate(adminSbSendUpdateDto.getSbSendPostcode(), adminSbSendUpdateDto.getSbSendState(),
                sbProductRepository.findById(adminSbSendUpdateDto.getSbProdNum()).orElse(null),
                adminSbSendUpdateDto.getSbShippingCode());

        subscribeSendRepository.save(subscribeSend);
    }

    @Override
    public SubscribeSendResponse.MyPageProfileSubscribeDto getMyPageProfileSubscribe() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        Optional<SubscribeMember> subscribeMember = sbMemberRepository.findByMemberIdAndSbEndDateIsNull(currentMemberId);
        if (subscribeMember.isPresent()) {
            List<SubscribeSend> subscribeSendList = subscribeSendRepository.findBySubscribeMember(subscribeMember.get()).get();
            SubscribeSend subscribeSend = subscribeSendRepository.findBySubscribeMember(subscribeMember.get()).get().get(subscribeSendList.size()-1);
            return SubscribeSendResponse.MyPageProfileSubscribeDto.of(subscribeSend);
        } else {
            return null;
        }
    }

    @Override
    public List<SubscribeSendResponse.MemberSubscribeDto> getMemberSubscribe() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        List<SubscribeMember> subscribeMemberList = sbMemberRepository.findByMemberId(currentMemberId)
                .orElse(Collections.emptyList());

        List<SubscribeSendResponse.MemberSubscribeDto> result = new ArrayList<>();

        for (SubscribeMember subscribeMember : subscribeMemberList) {
            List<SubscribeSend> subscribeSendList = subscribeSendRepository
                    .findBySubscribeMemberSbMemberNum(subscribeMember.getSbMemberNum())
                    .orElse(Collections.emptyList());

            result.addAll(subscribeSendList.stream()
                    .map(SubscribeSendResponse.MemberSubscribeDto::of)
                    .collect(Collectors.toList()));
        }

        return result;
    }
}
