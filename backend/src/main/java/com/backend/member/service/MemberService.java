package com.backend.member.service;

import com.backend.member.dto.*;
import com.backend.member.entity.Member;
import org.springframework.security.core.parameters.P;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface MemberService {

    String join(SignupDto signupDto);

    //    void updateMember(Member member);
    String updateMember(UpdateMemberDto updateMemberDto);

    void deleteMemberV1(Member member);

    void deleteMemberV2(String id);

    JwtTokenDto doLogin(LoginDto loginDto);

    Optional<Member> findId(FindDataDto findDataDto);

    String findPw(FindDataDto findDataDto);

    boolean insertMember(Member member);

    boolean existMemberId(String memberId);

    boolean existEmail(String email);

    MemberInfoDto getMemberInfo();

    boolean existPhone(String phone);

    void updateProfileImg(MultipartFile profileImg) throws IOException;

    void delProfileImg();

    void updatePushYn(PushYnDto pushYnDto);
}
