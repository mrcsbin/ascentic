package com.backend.payment.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tb_subscribe_card")
public class SubscribeCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String issuerCode;

    @Column
    private String acquirerCode;

    @Column
    private String number;

    @Column
    private String cardType;

    @Column
    private String ownerType;

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", issuerCode='" + issuerCode + '\'' +
                ", acquirerCode='" + acquirerCode + '\'' +
                ", number='" + number + '\'' +
                ", cardType='" + cardType + '\'' +
                ", ownerType='" + ownerType + '\'' +
                '}';
    }
}
