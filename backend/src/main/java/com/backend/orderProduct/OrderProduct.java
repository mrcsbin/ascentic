package com.backend.orderProduct;

import com.backend.order.Order;
import com.backend.productOption.ProductOption;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tb_order_prod")
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_prod_key")
    private Integer orderProdKey;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "option_num")
    private ProductOption productOption;

    @Column(name = "prod_count", nullable = false)
    private Integer prodCount;

    @Column(name = "order_state")
    private Boolean orderState;
}