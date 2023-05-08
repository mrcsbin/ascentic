package com.backend.member;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean insertMember(Member member) {
        if (memberRepository.existsById(member.getId())) {
            return false; // 이미 동일한 PK 값이 존재하면 false 반환
        }
        try {
            memberRepository.save(member);
            return true; // 삽입 성공 시 true 반환
        } catch (Exception e) {
            System.out.println(e);
            return false; // 삽입 실패 시 false 반환
        }
    }

    @Override
    public boolean existMemberId(String memberId){
        return memberRepository.existsById(memberId);
    }


    @Override
    public boolean existEmail(String email){
        return memberRepository.existsByEmail(email);
    }

    @Override
    public boolean existPhone(String phone) {
        return memberRepository.existsByPhone(phone);
    }
}
