package com.backend.member;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name="memberTbl")
@Getter @Setter
public class Member {
    @Id
    @Column(name="member_Id ")
    private String id;
    @Column(name="member_Password")
    private String password;

    @Column(name="member_Name", nullable = false)
    private String name;


    @Column(name="member_Phone" )
    private String phone;

    @Column(name="member_Email" , nullable = false)
    private String email;

    @Column(name="member_BirthDate")
    private String birthDate;

    @Column(name="member_SignUpTime")
    private LocalDateTime memberSignUpTime = LocalDateTime.now();

    @Column(name="member_Info_Yn", nullable = false)
    private boolean infoAgree;

    @Column(name="member_Sns_Push_Yn")
    private boolean snsPushYn;

    @Column(name="member_Email_Push_Yn")
    private boolean emailPushYn;


    public void setPassword(String password, PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(password);
    }
}

