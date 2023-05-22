package com.backend.wish.entity;

import com.backend.member.entity.Member;
import com.backend.product.entity.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "tb_wish")
public class Wish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wish_num")
    private Integer wishNum;


    @Column(name = "member_id")
    private String member;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "prod_num")
    private Product product;
}
