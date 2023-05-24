package com.backend.subscribemember.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tb_subscribe_member")
public class SubscribeMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sb_member_num")
    private Integer sbMemberNum;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "sb_start_date")
    private LocalDate sbStartDate;

    @Column(name = "sb_end_date")
    private LocalDate sbEndDate;

    @Column(name = "sb_member_name")
    private String sbMemberName;

    @Column(name = "sb_member_tel")
    private String sbMemberTel;

    @Column(name = "sb_main_addr")
    private String sbMainAddr;

    @Column(name = "sb_sub_addr")
    private String sbSubAddr;

    @Column(name = "sb_ship_message")
    private String sbShipMessage;

    @Column(name = "sb_pay")
    private String sbPay;

    @Column(name = "sb_payment_day")
    private Integer sbPaymentDay;

    @Column(name = "sb_price")
    private Integer sbPrice;

    @Column(name = "taste_result")
    private String tasteResult;
}
