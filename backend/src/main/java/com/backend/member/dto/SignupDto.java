package com.backend.member.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

// 사이즈 설정해야함
@Getter
public class SignupDto {

    @NotNull
    @Size(min = 1, max = 20)
    private String id;

    @NotNull
    @Size(min = 1, max = 20)
    private String password;

    @NotNull
    @Size(min = 1, max = 20)
    private String name;

    @NotNull
    @Size(min = 1, max = 20)
    private String phone;

    @NotNull
    @Size(min = 1, max = 20)
    private String email;

    @NotNull
    @Size(min = 1, max = 20)
    private String birth;
}