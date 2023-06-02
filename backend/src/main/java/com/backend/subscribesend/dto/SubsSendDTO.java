package com.backend.subscribesend.dto;


import com.backend.scent.entity.Scent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubsSendDTO {
    private Integer sbSendNum;
    private LocalDate sbStartDate;
    private LocalDate sbEndDate;
    private String sbPeriod;
    private String sbPay;
    private Integer sbPaymentDay; // 매달 결제일
    private String tasteResult;
    private Scent spScent;
    private Integer spPrice;
    private String spIntro;
//    private LocalDate sbSendStart;
//    private LocalDate sbSendEnd;
    private String sbSendPostcode;
    private Integer sbSendScore;
    private String sbSendReview;
    private LocalDate sbSendPayDate; // 결제 년/월/일
}
