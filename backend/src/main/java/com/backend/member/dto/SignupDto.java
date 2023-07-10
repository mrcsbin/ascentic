package com.backend.member.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

// 사이즈 설정해야함
@Getter
public class SignupDto {
    private String id;
    private String password;
    private String confirmPassword;
    private String name;
    private String phone;
    private String email;
    private String birthDate;
    private boolean emailPush;
    private boolean infoAgree;
    private boolean snsPush;
}
