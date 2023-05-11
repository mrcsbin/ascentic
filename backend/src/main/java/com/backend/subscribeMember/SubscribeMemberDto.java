package com.backend.subscribeMember;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubscribeMemberDto {
    private LocalDate sbStartDate;

    private LocalDate sbEndDate;

    private String sbPeriod;

    private String sbPay;

    private Integer sbPaymentDay;

    private String tasteResult;
}
