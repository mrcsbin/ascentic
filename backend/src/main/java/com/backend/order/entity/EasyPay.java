package com.backend.order.entity;

import jakarta.persistence.*;
import lombok.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tb_easypay")
public class EasyPay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer easyPayNum;

    @Column
    private String provider;

}


