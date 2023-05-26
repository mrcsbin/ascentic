package com.backend.order.dto;

import jakarta.persistence.Embeddable;
import lombok.*;

@Setter
@Getter
@Builder
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class Card {
    private Double amount;
    private String issuerCode;
    private String acquirerCode;
    private String number;
    private Integer installmentPlanMonths;
    private String approveNo;
    private Boolean useCardPoint;
    private String cardType;
    private String ownerType;
    private String acquireStatus;
    private Boolean isInterestFree;
    private String interestPayer;


}
