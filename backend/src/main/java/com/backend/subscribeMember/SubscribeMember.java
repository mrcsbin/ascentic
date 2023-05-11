package com.backend.subscribeMember;

import com.backend.member.entity.Member;
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

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "sb_start_date")
    private LocalDate sbStartDate;

    @Column(name = "sb_end_date")
    private LocalDate sbEndDate;

    @Column(name = "sb_period")
    private String sbPeriod;

    @Column(name = "sb_pay")
    private String sbPay;

    @Column(name = "sb_payment_day")
    private Integer sbPaymentDay;

    @Column(name = "taste_result")
    private String tasteResult;
}
