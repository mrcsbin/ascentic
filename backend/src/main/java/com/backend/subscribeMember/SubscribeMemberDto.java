package com.backend.subscribeMember;

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
    private LocalDate startDate;
    private LocalDate endDate;
    private String memberName;
    private String memberTel;
    private String mainAddress;
    private String subAddress;
    private String shipMessage;
    private String paymentMethod;
    private Integer monthPaymentDate;
    private Integer price;
    private String tasteResult;
}
