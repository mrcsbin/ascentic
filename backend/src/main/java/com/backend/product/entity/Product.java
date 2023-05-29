package com.backend.product.entity;

import com.backend.productimage.entity.ProductImage;
import com.backend.productoption.entity.ProductOption;
import com.backend.scent.entity.Scent;
import com.backend.wish.entity.Wish;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "tb_product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_num")
    private Integer prodNum;

    @Setter
    @ManyToOne
    @JoinColumn(name = "scent_name")
    private Scent scent;

    @Setter
    @Column(name = "prod_name")
    private String prodName;

    @Setter
    @Column(name = "prod_category")
    private String prodCategory;

    @Setter
    @Column(name = "prod_info")
    private String prodInfo;

    @Setter
    @Column(name = "prod_date")
    private LocalDateTime prodDate;

    @Setter
    @Column(name = "prod_read_count")
    private Integer prodReadCount;

    @Setter
    @Column(name = "prod_wish_count")
    private Integer prodWishCount; // Service에서 구현 필요(addWish: +1, delWish: -1)

    @Column(name = "prod_state")
    private Boolean prodState; // true: 판매중, false: 판매종료

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductOption> productOption = new ArrayList<>();

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Wish> wish = new ArrayList<>();

    @OneToMany(mappedBy = "product", fetch =  FetchType.LAZY)
    private List<ProductImage> productImages = new ArrayList<>();

    public Integer getProdPrice(Integer index) {
        return productOption.get(index).getProdPrice();
    }

    public String getProdOption(Integer index) {
        return productOption.get(index).getProdOption();
    }

    public Integer getProdOptionNum(Integer index) {
        return productOption.get(index).getOptionNum();
    }

    public Integer getWishCount(Integer prodNum) {
        int count = 0;
        for (Wish wishItem : wish) {
            if (Objects.equals(wishItem.getProduct().getProdNum(), prodNum)) {
                count++;
            }
        }
        return count;
    }

    public boolean isWish(String memberId, Integer prodNum) {
        for (Wish wishItem : wish) {
            if (Objects.equals(wishItem.getProduct().getProdNum(), prodNum) && Objects.equals(wishItem.getMemberId(), memberId)) {
                return true;
            }
        }
        return false;
    }

    public List<Integer> getOptionNums() {
        return productOption.stream()
                .map(ProductOption::getOptionNum)
                .collect(Collectors.toList());
    }
}