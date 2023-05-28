package com.backend.order.dto;

import jakarta.persistence.*;
import lombok.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer amount;
    @Column
    private String issuerCode;
    @Column
    private String acquirerCode;
    @Column
    private String number;

    @Column
    private Integer installmentPlanMonths;
    @Column
    private String approveNo;
    @Column
    private Boolean useCardPoint;
    @Column
    private String cardType;
    @Column
    private String ownerType;
    @Column
    private String acquireStatus;
    @Column
    private Boolean isInterestFree;
    @Column
    private String interestPayer;

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", amount=" + amount +
                ", issuerCode='" + issuerCode + '\'' +
                ", acquirerCode='" + acquirerCode + '\'' +
                ", number='" + number + '\'' +
                ", installmentPlanMonths=" + installmentPlanMonths +
                ", approveNo='" + approveNo + '\'' +
                ", useCardPoint=" + useCardPoint +
                ", cardType='" + cardType + '\'' +
                ", ownerType='" + ownerType + '\'' +
                ", acquireStatus='" + acquireStatus + '\'' +
                ", isInterestFree=" + isInterestFree +
                ", interestPayer='" + interestPayer + '\'' +
                '}';
    }
}
