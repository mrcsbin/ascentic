package com.backend.order.entity;

import com.backend.order.dto.Card;
import jakarta.persistence.Column;
import lombok.*;
import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
@Getter
@Setter
@Builder
@Table(name = "tb_order_payment_receipt")
public class PaymentFinalRes {
    @Id
    @Column
    private String paymentKey;
    @Column
    private String orderId;
    @Column
    private String orderName;
    @Column
    private String status;
//
//    private Card card;
//    @Embedded
//    private Cancel[] cancel;
//    @Embedded
    private Failure failure;
    @Column
    private Integer totalAmount;

    public PaymentFinalRes() {
    }

    public PaymentFinalRes(String paymentKey, String orderId, String orderName, String status,
                           Failure failure, Integer totalAmount) {
        this.paymentKey = paymentKey;
        this.orderId = orderId;
        this.orderName = orderName;
        this.status = status;
//        this.cancel = (cancel != null && cancel.length > 0) ? new Cancel[]{cancel[0]} : null;
        this.failure = failure;
        this.totalAmount = totalAmount;
//        this.card = card;
    }

    @Embeddable
    public static class Failure {
        private String code;
        private String message;
    }

    @Embeddable
    public static class Cancel {
        private Integer cancelAmount;
        private String cancelReason;
        private Integer taxFreeAmount;
        private Integer taxExemptionAmount;
        private Integer refundableAmount;
        private Integer easyPayDiscountAmount;
        private String canceledAt;
        private String transactionKey;
        private String receiptKey;
    }



}
