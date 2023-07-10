package com.backend.member.service;

import com.backend.member.entity.Member;
import com.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Optional<Member> member = memberRepository.findById(id);
        if (!member.isPresent()) {
            throw new UsernameNotFoundException("해당하는 id 의 회원 정보를 찾을 수 없음: " + id);
        }

        // UserDetails 객체에 id, pw, role 담아서 반환
        return User.builder()
                .username(member.get().getId())
                .password(member.get().getPassword())
                .roles(member.get().getRole().toArray(new String[0]))
                .build();
    }
}
