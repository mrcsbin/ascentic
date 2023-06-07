package com.backend.subscribesend.dto;

import com.backend.subscribesend.entity.SubscribeSend;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class SubscribeSendResponse {

    @Getter
    @Builder
    public static class MyPageProfileSubscribeDto {
        private String subscribeProductImage;
        private String subscribeProductInfo;
        private Integer subscribeProductPrice;
        private String subscribeProductScent;
        private String subscribeProductScentNoteName;
        private String subscribeStartDate;
        private String tasteResult;

        public static MyPageProfileSubscribeDto of(SubscribeSend subscribeSend) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy . MM . dd");
            String formattedDate = subscribeSend.getSubscribeMember().getSbStartDate().format(formatter);
            return new MyPageProfileSubscribeDto(
                    subscribeSend.getSubscribeProduct().getSbProdImage(),
                    subscribeSend.getSubscribeProduct().getSbProdIntro(),
                    subscribeSend.getSubscribeProduct().getSbProdPrice(),
                    subscribeSend.getSubscribeProduct().getScentName().getScentName(),
                    subscribeSend.getSubscribeProduct().getScentName().getScentNoteName(),
                    formattedDate,
                    subscribeSend.getSubscribeMember().getTasteResult()
            );
        }
    }

    @Getter
    @Builder
    public static class MemberSubscribeDto {
        private String subscribeProductImage;
        private String subscribeProductInfo;
        private Integer subscribeProductPrice;
        private String subscribeProductScent;
        private String subscribeProductScentNoteName;
        private String subscribeSendDate;
        private String subscribeSendPostCode;
        private String tasteResult;
        private String subscribeSendState;

        public static MemberSubscribeDto of(SubscribeSend subscribeSend) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy . MM . dd");
            String formattedDate = subscribeSend.getSubscribeMember().getSbStartDate().format(formatter);
            return new MemberSubscribeDto(
                    subscribeSend.getSubscribeProduct().getSbProdImage(),
                    subscribeSend.getSubscribeProduct().getSbProdIntro(),
                    subscribeSend.getSubscribeProduct().getSbProdPrice(),
                    subscribeSend.getSubscribeProduct().getScentName().getScentName(),
                    subscribeSend.getSubscribeProduct().getScentName().getScentNoteName(),
                    formattedDate,
                    subscribeSend.getSbSendPostcode(),
                    subscribeSend.getSubscribeMember().getTasteResult(),
                    subscribeSend.getSbSendState()
            );
        }
    }
}
