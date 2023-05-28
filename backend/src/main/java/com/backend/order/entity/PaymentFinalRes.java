package com.backend.order.entity;

import com.backend.order.dto.Card;
import com.backend.order.dto.Failure;
import jakarta.persistence.Column;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    @Column
    private Integer totalAmount;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    private Card card;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "failure_id")
    private Failure failure;

//    public PaymentFinalRes() {
//    }


//        this.cancel = (cancel != null && cancel.length > 0) ? new Cancel[]{cancel[0]} : null;
//public PaymentFinalRes(String paymentKey, String orderId, String orderName, String status,Failure failure, Integer totalAmount, Card card) {
//            this.paymentKey = paymentKey;
//            this.orderId = orderId;
//            this.orderName = orderName;
//            this.status = status;
//            this.failure = failure;
//            this.totalAmount = totalAmount;
//            this.card = card;
//        }


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
