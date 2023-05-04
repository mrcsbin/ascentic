package com.backend.member;

import org.springframework.stereotype.Service;

@Service
public interface MemberService {
    public Member insertMember(Member member);

    boolean existMemberId(String memberId);

    boolean existEmail(String email);

    boolean existPhone(String phone);
}
