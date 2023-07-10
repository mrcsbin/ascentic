package com.backend.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tb_member")
@AllArgsConstructor
@Builder
@NoArgsConstructor
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

    @Column(name = "member_BirthDate")
    private String birthDate;

    @Column(name = "member_image")
    private String image;

    @CreationTimestamp
    @Column(name = "member_SignUpTime")
    private LocalDate memberSignUpTime = LocalDate.now();

    @Column(name = "member_Info_Yn", nullable = false)
    private boolean infoAgree;

    @Column(name = "member_Sns_Push_Yn")
    private boolean snsPushYn;

    @Column(name = "member_Email_Push_Yn")
    private boolean emailPushYn;

    @Column(name = "member_point")
    private Integer memberPoint;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(name = "member_role")
    @CollectionTable(name = "tb_member_role", joinColumns = @JoinColumn(name = "member_id"))
    @Setter
    private List<String> role = new ArrayList<>();

    @Column(name = "member_buyWelcomeYn")
    private boolean buyWelcomePackageYn;

    public void changeEncodedPassword(String password) {
        this.password = password;
    }

    public void setPassword(String password, PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(password);
    }
}