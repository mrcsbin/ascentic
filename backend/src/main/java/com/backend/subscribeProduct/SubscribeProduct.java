package com.backend.subscribeProduct;

import com.backend.scent.Scent;
import com.backend.subscribeSend.SubscribeSend;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    // 돌아가면 삭제
//    @OneToMany(mappedBy = "subscribeProduct")
//    private List<SubscribeSend> subscribeSends;
}
