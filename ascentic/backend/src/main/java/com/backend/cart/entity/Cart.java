package com.backend.cart.entity;

import com.backend.member.entity.Member;
import com.backend.productoption.entity.ProductOption;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "tb_cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_num")
    private Integer cartNum;

    @ManyToOne
    @JoinColumn(name = "option_num")
    private ProductOption productOption;

    @Column(name = "member_id")
    private String memberId;

    @Setter
    @Column(name = "prod_count")
    private Integer prodCount;

    public Cart(Integer cartNum, ProductOption productOption, String memberId, Integer prodCount) {
        this.cartNum = cartNum;
        this.productOption = productOption;
        this.memberId = memberId;
        this.prodCount = prodCount;
    }
}

