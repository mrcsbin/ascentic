package com.backend.member.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FindDataDto {

    @NotNull
    @Size(min = 1, max = 10)
    private String name;

    @NotNull
    @Size(min = 1, max = 30)
    private String phone;

    private String id;


    private String email;
}
