package com.backend.order;

import com.backend.member.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tb_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "order_email", nullable = false)
    private String orderEmail;

    @Column(name = "order_name", nullable = false)
    private String orderName;

    @Column(name = "order_tel", nullable = false)
    private String orderTel;

    @Column(name = "ship_name", nullable = false)
    private String shipName;

    @Column(name = "ship_tel", nullable = false)
    private String shipTel;

    @Column(name = "ship_main_address", nullable = false)
    private String shipMainAddress;

    @Column(name = "ship_sub_address", nullable = false)
    private String shipSubAddress;

    @Column(name = "ship_message")
    private String shipMessage;

    @Column(name = "order_payment", nullable = false)
    private String orderPayment;

    @Column(name = "order_payment_info")
    private String orderPaymentInfo;

    @Column(name = "order_payment_state", nullable = false)
    private Boolean orderPaymentState;

    @Column(name = "order_state")
    private String orderState;

    @Column(name = "order_price_sum")
    private Integer orderPriceSum;

    @Column(name = "ship_charge")
    private Integer shipCharge;
}