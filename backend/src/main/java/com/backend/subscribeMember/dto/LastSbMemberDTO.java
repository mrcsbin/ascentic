package com.backend.subscribeMember.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class LastSbMemberDTO {
    private LocalDate sbStartDate;

    private LocalDate sbEndDate;

    private String sbPay;

    private Integer sbPaymentDay;

    private String memberName;

    private String mainAddress;

    private String subAddress;
}
