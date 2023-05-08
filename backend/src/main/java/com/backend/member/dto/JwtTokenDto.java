package com.backend.member.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class JwtTokenDto {
    private String grantType;
    private String accessToken;
    private String refreshToken;
}
