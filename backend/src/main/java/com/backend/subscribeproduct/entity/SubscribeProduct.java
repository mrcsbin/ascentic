package com.backend.subscribeproduct.entity;

import com.backend.scent.entity.Scent;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tb_subscribe_prod")
public class SubscribeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sp_num")
    private Integer sbProdNum;

    @OneToOne
    @JoinColumn(name = "sp_scent")
    private Scent scentName;

    @Column(name = "sp_price")
    private String sbProdPrice;

    @Column(name = "sp_intro")
    private String sbProdIntro;

    @Column(name = "sp_image")
    private String sbProdImage;

    // 돌아가면 삭제
//    @OneToMany(mappedBy = "subscribeProduct")
//    private List<SubscribeSend> subscribeSends;

    public void updateSbProduct(Scent scentName, String sbProdPrice, String sbProdIntro, String sbProdImage){
        this.scentName = scentName;
        this.sbProdPrice = sbProdPrice;
        this.sbProdIntro = sbProdIntro;
        this.sbProdImage = sbProdImage;
    }
}
