package com.backend.member;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private MemberServiceImpl memberServiceImpl;
    @Autowired
    public MemberController(MemberServiceImpl memberServiceImpl){
        super();
        this.memberServiceImpl = memberServiceImpl;
    }

    @PostMapping("/insert")
    public Member insertMember(@RequestBody Member member) {
        return memberServiceImpl.insertMember(member);
    }

    @GetMapping("/idDuplicate/{memberId}")
    public boolean existMemberId(@PathVariable String memberId){
        return memberServiceImpl.existMemberId(memberId);
    }

    @GetMapping("/emailDuplicate/{memberEmail}")
    public boolean existsEmail(@PathVariable String memberEmail) {
        return memberServiceImpl.existEmail(memberEmail);
    }
}
