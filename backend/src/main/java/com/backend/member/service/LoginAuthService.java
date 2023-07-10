package com.backend.member.service;

import com.backend.member.dto.JwtTokenDto;
import com.backend.member.entity.Member;

public interface LoginAuthService {

    String getKaKaoAccessToken(String code);

    JwtTokenDto createKakaoMember(String token);
}
