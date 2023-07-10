package com.backend.subscribesend.dto.admin;

import com.backend.subscribemember.entity.SubscribeMember;
import com.backend.subscribeproduct.entity.SubscribeProduct;
import com.backend.subscribesend.entity.SubscribeSend;
import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
public class AdminSendDto {
    private Integer sbSendNum; // 구독상품발송번호
    @Setter
    private SbMemberDto sbMember; // 구독회원 정보
    @Setter
    private SbProdDto subscribeProduct; // 구독상품 정보
    private String sbSendPostcode; // 배송주소
    private Integer sbSendScore; // 구독 평점
    private String sbSendReview; // 구독 리뷰
    private LocalDate sbSendPayDate; // 결제일
    private String sbSendPayment; // 결제수단
    private String sbShippingCode; // 송장번호
    private String sbSendState; // 구독상품발송상태

    public static AdminSendDto of(SubscribeSend subscribeSend) {
        AdminSendDto adminSendDto = AdminSendDto.builder()
                .sbSendNum(subscribeSend.getSbSendNum())
                .sbSendPostcode(subscribeSend.getSbSendPostcode())
                .sbSendScore(subscribeSend.getSbSendScore())
                .sbSendReview(subscribeSend.getSbSendReview())
                .sbSendPayDate(subscribeSend.getSbSendPayDate())
                .sbSendPayment(subscribeSend.getSbSendPayment())
                .sbShippingCode(subscribeSend.getSbShippingCode())
                .sbSendState(subscribeSend.getSbSendState())
                .build();
        adminSendDto.setSbMember(SbMemberDto.of(subscribeSend.getSubscribeMember()));
        adminSendDto.setSubscribeProduct(SbProdDto.of(subscribeSend.getSubscribeProduct()));
        return adminSendDto;
    }

    @AllArgsConstructor
    @Getter
    public static class SbMemberDto {
        private Integer sbMemberNum; // 구독멤버 기본키
        private String memberId; // 구독회원 id
        private LocalDate sbStartDate; // 구독 시작일
        private LocalDate sbEndDate; // 구독 종료일
        private String sbMemberName; // 구독자 성함
        private String sbMemberTel; // 구독자 연락처
        private String sbShipMessage; // 배송메세지
        private Integer sbPrice; // 월구독료
        private String tasteResult; // 선택한 향제품

        public static SbMemberDto of(SubscribeMember subscribeMember) {
            return new SbMemberDto(subscribeMember.getSbMemberNum(),
                    subscribeMember.getMemberId(),
                    subscribeMember.getSbStartDate(),
                    subscribeMember.getSbEndDate(),
                    subscribeMember.getSbMemberName(),
                    subscribeMember.getSbMemberTel(),
                    subscribeMember.getSbShipMessage(),
                    subscribeMember.getSbPrice(),
                    subscribeMember.getTasteResult());
        }
    }

    @AllArgsConstructor
    @Getter
    public static class SbProdDto {
        private Integer sbProdNum; // 상품기본키
        private String scentName; // 소분류
        private String scentNoteName; // 대분류
        private Integer sbProdPrice; // 가격
        private String sbProdIntro; // 소개
        private String sbProdImage; // 이미지

        public static SbProdDto of (SubscribeProduct subscribeProduct) {
            return new SbProdDto(subscribeProduct.getSbProdNum(),
                    subscribeProduct.getScentName().getScentName(),
                    subscribeProduct.getScentName().getScentNoteName(),
                    subscribeProduct.getSbProdPrice(),
                    subscribeProduct.getSbProdIntro(),
                    subscribeProduct.getSbProdImage());
        }
    }
}
