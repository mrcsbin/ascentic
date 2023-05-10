package com.backend.subscribeProduct;

import com.backend.scent.Scent;
import com.backend.subscribeSend.SubscribeSend;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tb_subscribe_prod")
public class SubscribeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sp_num")
    private Integer spNum;

    @OneToOne
    @JoinColumn(name = "sp_scent")
    private Scent spScent;

    @Column(name = "sp_price")
    private String spPrice;

    @Column(name = "sp_intro")
    private String spIntro;

    // 돌아가면 삭제
//    @OneToMany(mappedBy = "subscribeProduct")
//    private List<SubscribeSend> subscribeSends;
}
