package com.backend.productImg;

import com.backend.product.Product;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tb_prod_image")

public class ProductImg {
    @Id // 기본키
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT
    @Column(name = "prod_img_num") // 컬럼명 지정
    private Integer imgNum;

    @ManyToOne // 다:1 관계
    @JoinColumn(name="prod_num")
    private Product product;

    @Column(name = "prod_save_name")
    private String prodSaveName;

    @Column(name = "prod_upload_name")
    private String prodUploadName;

    // CURRENT_TIMESTAMP 적용
    @Column(name = "prod_upload_date", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime prodUploadDate;

    @Column(name = "prod_image_type") // 0: 썸네일, 1: 상품 설명 첫사진 2: 상품 설명 사진
    private Integer prodImageType;

}
