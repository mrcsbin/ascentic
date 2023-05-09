package com.backend.member.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UpdateMemberDto {

    @Size(min = 1, max = 20)
    private String password;

    private String image;

}
