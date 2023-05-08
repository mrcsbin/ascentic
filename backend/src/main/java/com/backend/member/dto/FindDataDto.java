package com.backend.member.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class FindDataDto {

    @NotNull
    @Size(min = 1, max = 10)
    private String name;

    @NotNull
    @Size(min = 1, max = 30)
    private String email;

    private String id;
}
