package com.backend.member;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberServiceImpl memberServiceImpl;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/insert")
    public String insertMember(@RequestBody Member member) {
        member.setPassword(member.getPassword(), passwordEncoder); // 암호화된 비밀번호를 저장
        boolean result = memberServiceImpl.insertMember(member);
        if (result) {
            return member.getName() + "님 회원 가입이 완료되었습니다.";
        } else {
            return "회원 가입에 실패하였습니다.";
        }
    }


    @GetMapping("/idDuplicate/{memberId}")
    public boolean existsMemberId(@PathVariable String memberId){
        return memberServiceImpl.existMemberId(memberId);
    }

    @GetMapping("/emailDuplicate/{memberEmail}")
    public boolean existsEmail(@PathVariable String memberEmail) {
        return memberServiceImpl.existEmail(memberEmail);
    }
}
