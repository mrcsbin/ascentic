package com.backend.subscribemember.dto;

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

    private String sbPay;

    private Integer sbPaymentDay;

    private String memberName;

    private String mainAddress;

    private String subAddress;
    private String tasteResult;
}

