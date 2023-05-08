package com.backend.member.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
public class LoginDto {

    @NotNull
    @Size(min = 1, max = 50)
    private String id;

    @NotNull
    @Size(min = 8, max = 30)
    private String password;

    private Boolean rememberData;

    public Boolean isRememberData() {
        return rememberData;
    }
}