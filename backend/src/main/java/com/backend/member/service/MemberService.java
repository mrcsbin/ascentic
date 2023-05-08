package com.backend.member.service;

import com.backend.member.dto.SignupDto;
import com.backend.member.dto.FindDataDto;
import com.backend.member.dto.JwtTokenDto;
import com.backend.member.dto.LoginDto;
import com.backend.member.entity.Member;

import java.util.Optional;

public interface MemberService {

    String join(SignupDto signupDto);

    void updateMember(Member member);

    void deleteMemberV1(Member member);

    void deleteMemberV2(String id);

    JwtTokenDto doLogin(LoginDto loginDto);

    Optional<Member> findId(FindDataDto findDataDto);

    String findPw(FindDataDto findDataDto);

    boolean insertMember(Member member);

    boolean existMemberId(String memberId);

    boolean existEmail(String email);

    boolean existPhone(String phone);
}
