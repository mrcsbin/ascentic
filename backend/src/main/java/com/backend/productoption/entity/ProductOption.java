package com.backend.productoption.entity;

import com.backend.orderproduct.entity.OrderProduct;
import com.backend.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_product_option")
public class ProductOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_num")
    private Integer optionNum;

    @Column(name = "prod_option")
    private String prodOption;

    @Column(name = "prod_price")
    private Integer prodPrice;

    @Column(name = "prod_stock")
    private Integer prodStock;

    @Column(name = "option_state")
    private String optionState; // 판매중, 판매종료, 품절

    @ManyToOne
    @JoinColumn(name = "prod_num")
    private Product product;   ///이걸 Product Class로 설정해도 db엔 PK만 들어 갔던거임!!! 근데 왜?

    @OneToMany(mappedBy = "productOption", fetch = FetchType.LAZY)
    private List<OrderProduct> orderProduct = new ArrayList<>();

}
