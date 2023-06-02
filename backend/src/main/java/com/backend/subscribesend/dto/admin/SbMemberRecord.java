package com.backend.subscribesend.dto.admin;

import com.backend.subscribemember.entity.SubscribeMember;
import com.backend.subscribeproduct.entity.SubscribeProduct;
import com.backend.subscribesend.entity.SubscribeSend;
import lombok.*;

import java.time.LocalDate;

//@Builder
@Setter @Getter
@NoArgsConstructor
public class SbMemberRecord {
    private SbProdRecord sbProdRecord;
    private SbSendRecord sbSendRecord;

    public static SbMemberRecord of(SubscribeSend subscribeSend) {
        SbMemberRecord sbMemberRecord = new SbMemberRecord();
        sbMemberRecord.setSbProdRecord(SbProdRecord.of(subscribeSend.getSubscribeProduct()));
        sbMemberRecord.setSbSendRecord(SbSendRecord.of(subscribeSend));

        return sbMemberRecord;
    }

    @AllArgsConstructor
    @Getter
    public static class SbProdRecord {
        private Integer sbProdNum;
        private String sbProdImg;
        private String scentNoteName;
        private String scentName;
        private Integer sbProdPrice;
        private String sbProdIntro;
        private Integer sbProdStock;

        public static SbProdRecord of(SubscribeProduct subscribeProduct) {
            return new SbProdRecord(subscribeProduct.getSbProdNum(),
                    subscribeProduct.getSbProdImage(),
                    subscribeProduct.getScentName().getScentNoteName(),
                    subscribeProduct.getScentName().getScentName(),
                    subscribeProduct.getSbProdPrice(),
                    subscribeProduct.getSbProdIntro(),
                    subscribeProduct.getSbProdStock());
        }
    }

    @AllArgsConstructor
    @Getter
    public static class SbSendRecord {
        private LocalDate sbSendPayDate;
        private String review;
        private Integer score;

        public static SbSendRecord of(SubscribeSend subscribeSend) {
            return new SbSendRecord(
                    subscribeSend.getSbSendPayDate(),
                    subscribeSend.getSbSendReview(),
                    subscribeSend.getSbSendScore()
            );
        }
    }
}
