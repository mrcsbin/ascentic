package com.backend.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


// 자격 증명 엔티티
//@Entity
//@Getter
//@Setter
//public class Authority {
//
//    @Id
//    @Column(name = "authority_name", length = 50)
//    private String name;

//    @Id
//    @GeneratedValue
//    @Column(name = "authority_id")
//    private long id;
//
//    @Column(name = "authority_name")
//    private String authorityName;

//    @OneToMany(mappedBy = "authority")
//    private List<MemberTest> memberTests = new ArrayList<MemberTest>();

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "membertest_id") // 외래키
//    private MemberTest memberTest;
//}

public enum Authority {
    ROLE_USER, ROLE_ADMIN
}