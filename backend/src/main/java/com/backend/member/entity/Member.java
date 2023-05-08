package com.backend.member.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "member_tbl")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @Column(name = "member_id")
    private String id;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_password")
    private String password;

    @Column(name = "member_email", unique = true)
    private String email;

    @Column(name = "member_phone", unique = true)
    private String phone;

    @Column(name = "member_birth")
    private String birth;

    @Column(name = "member_image")
    private String image;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(name = "member_role")
    @CollectionTable(name = "member_role_tbl", joinColumns = @JoinColumn(name = "member_id"))
    @Setter
    private List<String> role = new ArrayList<>();

//    @Column
//    @Enumerated(EnumType.STRING)
//    private Authority authority;


//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "authority_id") // 외래키
//    private Authority authority;

//    @OneToMany(mappedBy = "memberTest")
//    private Set<Authority> authorities;

    @Builder
    public Member(String id, String name, String password, String email, String phone, String birth, String image, List<String> role) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.birth = birth;
        this.image = image;
        this.role = role;
    }

    public void ChangeEncodedPassword(String password) {
        this.password = password;
    }


}