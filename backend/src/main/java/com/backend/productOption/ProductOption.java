package com.backend.productOption;

import com.backend.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_product_option")
public class ProductOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_num")
    private Integer optionNum;

    @ManyToOne
    @JoinColumn(name = "prod_num")
    private Product product;

    @Column(name = "prod_option")
    private String prodOption;
}
