package com.backend.subscribemember.dto;

import com.backend.payment.entity.SubscribeCard;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class LastSbMemberDTO {
    private LocalDate sbStartDate;

    private LocalDate sbEndDate;

    private LocalDate theFirstSbStartDate; //계정의 맨 처음 구독날짜

    private SubscribeCard sbPay;

    private Integer sbPaymentDay;

    private String memberName;

    private String mainAddress;

    private String subAddress;
    private String tasteResult;
}

