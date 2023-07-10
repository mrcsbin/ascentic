package com.backend.payment.entity;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="tb_subscribe_payment_receipt")
@Entity
public class SubscribePaymentReceipt {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subscribePaymentResNum;

    @Column
    private String memberId;

    @Column
    private String orderId; //구독기간동안의 유일한 orderId;

    @Column
    private String paymentCompletionDate; //결제 완료 날짜

    @Column
    private String paymentKey; //토스측 영수증 번호


}
