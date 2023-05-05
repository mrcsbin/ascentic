package com.backend.member;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;


@Entity
@Table(name="memberTbl")
@Getter @Setter
@NotNull
public class Member {
    @Id
    @Column(name="member_id")
    private String memberId;

    @Column(name="member_password")
    private String password;

    @Column(name="member_name")
    private String name;
//
//    @Column(name="memberIdentificationCode")
//    private String identificationCode;

    @Column(name="member_phone")
    private String phone;

    @Column(name="member_email")
    private String email;

    @Column(name="member_birth_date")
    private String memberBirthDate;

    @Column(name="member_signUp_time")
    private LocalDateTime memberSignUpTime = LocalDateTime.now();

    @Column(name="member_info_yn")
    private boolean infoAgree;

    @Column(name="member_sns_Push_yn")
    private boolean snsPushYn;

    @Column(name="member_email_Push_yn")
    private boolean emailPushYn;

}

