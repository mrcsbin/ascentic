package com.backend.member.controller;

import com.backend.member.dto.*;
import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Iterator;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberServiceImpl memberService;

    @GetMapping("/checktoken")
    public Member tokenValidate() {
        Member myInfoBySecurity = memberService.getMyInfoBySecurity();
        return myInfoBySecurity;
    }

    @GetMapping("/user")
    public Member userTest() {
        System.out.println("asd");
        Member myInfoBySecurity = memberService.getMyInfoBySecurity();
        return myInfoBySecurity;
    }

    @GetMapping("/admin")
    public String adminTest() {
        System.out.println("asd");

        return "ADMIN 권한 가지고 있음 OK";
    }

    // 회원가입
    @PostMapping("/signup")
    public void join(@RequestBody SignupDto signupDto) {
        memberService.join(signupDto);
    }

    @GetMapping("/idDuplicate/{memberId}")
    public boolean existsMemberId(@PathVariable String memberId) {
        return memberService.existMemberId(memberId);
    }

    @GetMapping("/emailDuplicate/{memberEmail}")
    public boolean existsEmail(@PathVariable String memberEmail) {
        return memberService.existEmail(memberEmail);
    }

    // 회원 수정
//    @PatchMapping("/{id}")
//    public String updateMember(@PathVariable String id, @RequestBody Member member) {
//        memberService.updateMember(member);
//        return id + "님 수정이 완료 되었습니다.";
//    }

    @PatchMapping("/userUpdate")
    public String updateMember(@RequestBody UpdateMemberDto updateMemberDto) {
        return memberService.updateMember(updateMemberDto);
    }

    // 회원 탈퇴 V1 - 상태값 바꾸기 => 같은 아이디로 가입과 삭제를 반복했을 때 통계엔 다 회원으로 기록
    @DeleteMapping("/{id}/v1")
    public String deleteMemberV1(@PathVariable String id, @RequestParam Member member) {
        memberService.deleteMemberV1(member);
        return id + "님 그동안 이용해주셔서 감사합니다.";
    }

    // 회원 탈퇴 V2 - 테이블안에 값 없애버리기
    @DeleteMapping
    public String deleteMemberV2(@RequestBody DeleteMemberDto deleteMemberDto) {
        return memberService.deleteMemberV2(deleteMemberDto);
    }

    // 로그인
    @PostMapping("/login")
    public JwtTokenDto doLogin(@RequestBody LoginDto loginDto) {
        JwtTokenDto jwtTokenDto = memberService.doLogin(loginDto);
        if (jwtTokenDto == null) {
            return null;
        } else {
            return jwtTokenDto;
        }
    }

    // 아이디 찾기
    @PostMapping("/find/id")
    public String findId(@RequestBody FindDataDto findDataDto) {
        Optional<Member> findMemberId = memberService.findId(findDataDto);
        if (!findMemberId.isPresent()) {
            return "찾으시는 정보가 없습니다.";
        } else {
            return findMemberId.get().getId();
        }
    }

    // 비밀번호 찾기
    @PostMapping("/find/pw")
    public String findPw(@RequestBody FindDataDto findDataDto) {
        String answer = memberService.findPw(findDataDto);
        if (answer=="성공") {
            return "가입하실때 사용하셨던 이메일로 임시 비밀번호가 발급되었습니다.";
        } else {
            return "찾으시는 정보가 없습니다";
        }
    }

    // 멤버 정보 가져오기
    @GetMapping("/order/getuser")
    public MemberInfoDto getUserInfo() {
        MemberInfoDto memberInfo = memberService.getMemberInfo();
        return memberInfo;
    }

    @GetMapping("/mypage/profile")
    public MemberResponse.MyPageDto getMyPageProfile() {
        return memberService.getMyPageProfile();
    }

    @PostMapping("/updateProfile")
    public void updateProfileImg(MultipartFile profileImg) throws IOException {
        memberService.updateProfileImg(profileImg);
    }

    @GetMapping("/delProfile")
    public void delProfileImg() {
        memberService.delProfileImg();
    }

    @PostMapping("/updatePushYn")
    public void updatePushYn(@RequestBody PushYnDto pushYnDto) {
        memberService.updatePushYn(pushYnDto);
    }

    @GetMapping("getPoint")
    public Integer getPoint() {
        return memberService.getPoint();
    }

    @GetMapping("/ismember")
    public boolean isExistMember(String name, String phone) {
        return memberService.isExistMember(name, phone);
    }
}