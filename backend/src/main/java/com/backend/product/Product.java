package com.backend.product;

import com.backend.productImg.ProductImg;
import com.backend.productOption.ProductOption;
import com.backend.scent.Scent;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name = "tb_product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_num")
    private Integer prodNum;

    @ManyToOne
    @JoinColumn(name = "scent_name")
    private Scent scent;

    @Column(name = "prod_name")
    private String prodName;

    @Column(name = "prod_category")
    private String prodCategory;

    @Column(name = "prod_price")
    private String prodPrice;

    @Column(name = "prod_stock")
    private Integer prodStock;

    @Column(name = "prod_info")
    private String prodInfo;

    @Column(name = "prod_date")
    private LocalDateTime prodDate;

    @Column(name = "prod_read_count")
    private Integer prodReadCount;

    @Column(name = "prod_wish_count")
    private Integer prodWishCount; // Service에서 구현 필요(addWish: +1, delWish: -1)

//    @OneToMany(mappedBy = "product")  //mappedBy 는 걍 변수명으로 줘야됐던거임
//    private List<ProductImg> productImg;

//    @OneToMany(mappedBy = "product")
//    private List<ProductOption> option;
}