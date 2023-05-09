package com.backend.cart;

import com.backend.member.entity.Member;
import com.backend.productOption.ProductOption;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_num")
    private Integer cartNum;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "option_num")
    private ProductOption productOption;

//    @ManyToOne
//    @JoinColumn(name = "prod_num")
//    private Product product;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "prod_count")
    private Integer prodCount;

}

