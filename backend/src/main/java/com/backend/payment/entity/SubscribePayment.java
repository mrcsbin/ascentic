package com.backend.payment.entity;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="tb_subscribe_payment")
@Entity
public class SubscribePayment {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subscribePaymentNum;

    @Column
    private String customerKey; // Member에 있는거 그대로 가져옴 -- 구독

    @Column
    private String billingKey; //실 결제시 필요한 데이터

//    @Column
//    private String orderId;

    @Column
    private String memberId; // 자동결제용

    @Column
    private String customerEmail;

    @Column
    private Integer amount; // 구독 회원이 만들어 지기전이라 필요함

    @Column
    private String authenticatedTime; //

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    private SubscribeCard subscribeCard;

    @Override
    public String toString() {
        return "SubscribePayment{" +
                "subscribePaymentNum=" + subscribePaymentNum +
                ", customerKey='" + customerKey + '\'' +
                ", billingKey='" + billingKey + '\'' +
//                ", orderId='" + orderId + '\'' +
                ", memberID='" + memberId + '\'' +
                ", customerEmail='" + customerEmail + '\'' +
                ", amount=" + amount +
                ", authenticatedTime='" + authenticatedTime + '\'' +
                ", subscribeCard=" + subscribeCard +
                '}';
    }


}
