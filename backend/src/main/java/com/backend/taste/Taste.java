package com.backend.taste;

import com.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tb_taste")
public class Taste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taste_num")
    private Integer tasteNum;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "taste_agree")
    private Boolean tasteAgree;

    @Column(name = "taste_name")
    private String tasteName;

    @Column(name = "taste_gender")
    private String tasteGender;

    @Column(name = "taste_age")
    private Integer tasteAge;

    @Column(name = "taste_test1")
    private Integer tasteTest1;

    @Column(name = "taste_test2")
    private Integer tasteTest2;

    @Column(name = "taste_test3")
    private Integer tasteTest3;

    @Column(name = "taste_test4")
    private Integer tasteTest4;

    @Column(name = "taste_test5")
    private Integer tasteTest5;

    @Column(name = "first_place")
    private String firstPlace;

    @Column(name = "second_place")
    private String secondPlace;

    @Column(name = "third_place")
    private String thirdPlace;

    @CreationTimestamp
    @Column(name = "taste_date")
    private LocalDateTime tasteDate;
}
