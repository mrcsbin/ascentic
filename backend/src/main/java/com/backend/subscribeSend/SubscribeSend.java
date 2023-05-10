package com.backend.subscribeSend;

import com.backend.subscribeMember.SubscribeMember;
import com.backend.subscribeProduct.SubscribeProduct;
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
    private SubscribeProduct sbSubscribeProduct;

    @Column(name = "sb_send_start")
    private LocalDate sbSendStart;

    @Column(name = "sb_send_end")
    private LocalDate sbSendEnd;

    @Column(name = "sb_send_postcode")
    private String sbSendPostcode;

    @Column(name = "sb_send_score")
    private Integer sbSendScore;

    @Column(name = "sb_send_review")
    private String sbSendReview;

    @Column(name = "sb_send_paydate")
    private LocalDate sbSendPayDate;

    @Column(name = "sb_send_payment")
    private String sbSendPayment;
}


