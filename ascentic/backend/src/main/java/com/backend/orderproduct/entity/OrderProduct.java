package com.backend.orderproduct.entity;

import com.backend.order.entity.Order;
import com.backend.productoption.entity.ProductOption;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_order_prod")
@Builder
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_prod_num")
    private int orderProdNum;

    @ManyToOne
    @JoinColumn(name = "order_num", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "option_num", nullable = false)
    private ProductOption productOption;

    @Column(name = "prod_count", nullable = false)
    private Integer prodCount;

    @Column(name = "order_state")
    private String orderState;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "order_review_state")
    private String orderReviewState;
}