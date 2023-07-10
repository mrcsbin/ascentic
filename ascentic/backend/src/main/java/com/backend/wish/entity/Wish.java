package com.backend.wish.entity;

import com.backend.product.entity.Product;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Builder
@Table(name = "tb_wish")
public class Wish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wish_num")
    private Integer wishNum;

    @Column(name = "member_id")
    private String memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prod_num")
    private Product product;

    public Wish(Integer wishNum, String memberId, Product product) {
        this.wishNum = wishNum;
        this.memberId = memberId;
        this.product = product;
    }

}
