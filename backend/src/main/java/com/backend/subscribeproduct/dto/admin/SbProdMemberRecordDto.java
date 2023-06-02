package com.backend.subscribeproduct.dto.admin;

import com.backend.subscribeproduct.entity.SubscribeProduct;
import com.backend.subscribesend.entity.SubscribeSend;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
public class SbProdMemberRecordDto {
    private Integer sbProdNum;
    private String sbProdImage;
    private String scentNoteName;
    private String scentName;
    private Integer sbProdPrice;
    private String sbProdIntro;
    private Integer sbProdStock;

    private List<SbProdMemberReviewDto> sbProdMemberReviewDto;

    public static SbProdMemberRecordDto of(SubscribeProduct subscribeProduct, String memberId) {
        SbProdMemberRecordDto sbProdMemberRecordDto = SbProdMemberRecordDto.builder()
                .sbProdNum(subscribeProduct.getSbProdNum())
                .sbProdImage(subscribeProduct.getSbProdImage())
                .scentNoteName(subscribeProduct.getScentName().getScentNoteName())
                .scentName(subscribeProduct.getScentName().getScentName())
                .sbProdPrice(subscribeProduct.getSbProdPrice())
                .sbProdIntro(subscribeProduct.getSbProdIntro())
                .sbProdStock(subscribeProduct.getSbProdStock())
                .build();
        sbProdMemberRecordDto.setSbProdMemberReviewDtoList(subscribeProduct.getSubscribeSendList(), memberId);
        return sbProdMemberRecordDto;
    }

    private void setSbProdMemberReviewDtoList(List<SubscribeSend> subscribeSends, String memberId) {
        sbProdMemberReviewDto = subscribeSends.stream()
                .filter(subscribeSend -> subscribeSend.getSubscribeMember().getMemberId().equals(memberId))
                .map(SbProdMemberReviewDto::of)
                .collect(Collectors.toList());
    }

    @AllArgsConstructor
    @Getter
    public static class SbProdMemberReviewDto {
        private LocalDate sbSendPayDate;
        private String review;
        private Integer score;

        public static SbProdMemberReviewDto of(SubscribeSend subscribeSend) {
            return new SbProdMemberReviewDto(subscribeSend.getSbSendPayDate(),
                    subscribeSend.getSbSendReview(),
                    subscribeSend.getSbSendScore());
        }
    }
}
