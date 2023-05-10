package com.backend.tasteRes;


import com.backend.taste.Taste;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tb_taste_res")
public class TasteRes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taste_res_num")
    private Integer tasteResNum;

    @OneToOne
    @JoinColumn(name = "taste_num")
    private Taste taste;

    @Column(name = "first_place")
    private String firstPlace;

    @Column(name = "second_place")
    private String secondPlace;

    @Column(name = "third_place")
    private String thirdPlace;
}
