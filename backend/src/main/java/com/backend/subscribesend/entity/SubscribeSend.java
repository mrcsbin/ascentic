package com.backend.subscribesend.entity;

import com.backend.subscribemember.entity.SubscribeMember;
import com.backend.subscribeproduct.entity.SubscribeProduct;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tb_subscribe_send")
public class SubscribeSend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sb_send_num")
    private Integer sbSendNum;

    @ManyToOne
    @JoinColumn(name = "sb_member_num")
    private SubscribeMember subscribeMember;

    @ManyToOne
    @JoinColumn(name = "sp_num")
    private SubscribeProduct subscribeProduct;

    @Column(name = "sb_send_postcode")
    private String sbSendPostcode;

    @Column(name = "sb_send_score")
    private Integer sbSendScore;

    @Column(name = "sb_send_review")
    private String sbSendReview;

    //    @CreationTimestamp
    @Column(name = "sb_send_paydate")
    private LocalDate sbSendPayDate; //정기결제가 인식되면 객체생성? 또는 미리 만들어 놓고 결제되면 결제일만 추가?

    @Column(name = "sb_send_payment")
    private String sbSendPayment;

    @Column(name = "sb_shipping_code")
    private String sbShippingCode;

    @Column(name = "sb_send_state")
    private String sbSendState; // 결제완료, 상품준비중, 배송준비중, 배송중, 배송완료
}

