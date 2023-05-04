package com.backend.member;

import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public Member insertMember(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public boolean existMemberId(String memberId){
        return memberRepository.existsByMemberId(memberId);
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
