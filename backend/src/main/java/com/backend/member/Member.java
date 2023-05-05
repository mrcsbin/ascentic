package com.backend.member;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name="memberTbl")
@Getter @Setter
@NotNull
public class Member {
    @Id
    @Column(name="memberUniqueId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uniqueId;

    @Column(name="memberId")
    private String memberId;
    @Column(name="memberPassword")
    private String password;

    @Column(name="memberName")
    private String name;
//
//    @Column(name="memberIdentificationCode")
//    private String identificationCode;

    @Column(name="memberPhone")
    private String phone;

    @Column(name="memberEmail")
    private String email;

    @Column(name="memberBirthDate")
    private String memberBirthDate;

    @Column(name="memberSignUpTime")
    private LocalDateTime memberSignUpTime = LocalDateTime.now();

    @Column(name="memberInfoYn")
    private boolean infoAgree;

    @Column(name="memberSnsPushYn")
    private boolean snsPushYn;

    @Column(name="memberEmailPushYn")
    private boolean emailPushYn;

}

