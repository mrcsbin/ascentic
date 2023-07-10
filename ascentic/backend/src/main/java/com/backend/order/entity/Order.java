package com.backend.order.entity;

import com.backend.member.entity.Member;
import com.backend.orderproduct.entity.OrderProduct;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @Column(name = "order_num")
    private Integer orderNum;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "order_id", unique = true)
    private String orderId;

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

    @CreationTimestamp
    @Column(name = "orderDate", nullable = false)
    private LocalDateTime orderDate;

    @Column(name = "tossPaymentKey")
    private String tossPaymentKey;

    @Column(name = "ship_code")
    private String shipCode;

    @Column(name = "use_point")
    private Integer usePoint;

    @OneToMany(mappedBy = "order", cascade = CascadeType.REMOVE)
    private List<OrderProduct> orderProducts = new ArrayList<>();

    //  "관리자 order 정보 수정"
    // 수령인 이름, 수령인 연락처, 주소, 배송메시지, 운송장 번호 등록  => 업데이트
    public void updateOrder(String shipName, String shipTel, String shipMainAddress,
                            String shipSubAddress, String shipMessage, String shipCode, String orderState) {
        this.shipName = shipName;
        this.shipTel = shipTel;
        this.shipMainAddress = shipMainAddress;
        this.shipSubAddress = shipSubAddress;
        this.shipMessage = shipMessage;
        this.shipCode = shipCode;
        this.orderState = orderState;
    }

    // 결제완료시 주문상태 update
    public void updatePaymentState(Order order) {
        order.setOrderState("결제완료");
        order.setOrderPaymentState(true);
    }

    public List<OrderProduct> getOrderProductList(Order order) {
        return order.getOrderProducts();
    }
}