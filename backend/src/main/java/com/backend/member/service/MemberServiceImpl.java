package com.backend.member.service;

import com.backend.MessageAndMail.MailController;
import com.backend.member.dto.FindDataDto;
import com.backend.member.dto.JwtTokenDto;
import com.backend.member.dto.LoginDto;
import com.backend.member.dto.SignupDto;
import com.backend.member.entity.Member;
import com.backend.member.jwt.JwtTokenProvider;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.jwt.TempPasswordGenerator;
import com.backend.member.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
    private final MailController mailController;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    @Override
    @Transactional
    public String join(SignupDto signupDto) {
        Member member = Member.builder()
                .id(signupDto.getId())
                .name(signupDto.getName())
                .email(signupDto.getEmail())
                .phone(signupDto.getPhone())
                .password(passwordEncoder.encode(signupDto.getPassword()))
                .role(Collections.singletonList("USER"))
                .birthDate(signupDto.getBirth())
                .build();

        return memberRepository.save(member).getId();
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

    @Override
    @Transactional
    public void updateMember(Member member) {
        member.setRole(Collections.singletonList("USER"));
        member.ChangeEncodedPassword(passwordEncoder.encode(member.getPassword()));
        memberRepository.save(member);
    }

    @Override
    @Transactional
    public void deleteMemberV1(Member member) {
        memberRepository.save(member);
    }

    @Override
    @Transactional
    public void deleteMemberV2(String id) {
        memberRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public JwtTokenDto doLogin(LoginDto loginDto) {
        Optional<Member> findData = memberRepository.findById(loginDto.getId());

        if (findData.isPresent()) {
            Member member = findData.get();
            if (passwordEncoder.matches(loginDto.getPassword(), member.getPassword()) && loginDto.getId().equals(member.getId())) {
                JwtTokenDto jwtTokenDto = jwtTokenProvider.generateToken(member);
//                JwtTokenDto jwtTokenDto = JwtTokenDto.builder()
//                        .grantType("bearer")
//                        .accessToken(jwtToken)
//                        .refreshToken(jwtToken)
//                        .build();
                log.debug("jwtToken : {}", jwtTokenDto);
                return jwtTokenDto;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Member> findId(FindDataDto findDataDto) {
        return memberRepository.findByNameAndPhone(findDataDto.getName(), findDataDto.getPhone());
    }

    @Override
    @Transactional
    public String findPw(FindDataDto findDataDto) {
        Optional<Member> member = memberRepository.findByNameAndIdAndPhone(findDataDto.getName(), findDataDto.getId(), findDataDto.getPhone());
        Optional<Member> sendTo = memberRepository.findEmailByPhone(findDataDto.getPhone());
        String tempPassword = TempPasswordGenerator.generateRandomPassword(10);
        if (member.isPresent()) {
            changeTempPw(member.get(), tempPassword);
            // 이메일 전송
            mailController.sendMail(sendTo.get(), tempPassword, findDataDto.getName());

        }
        return "해당 회원이 존재하지 않습니다.";
    }


    @Transactional
    public void changeTempPw(Member member, String tempPassword) {
        member.ChangeEncodedPassword(passwordEncoder.encode(tempPassword));
        memberRepository.save(member);
    }

    @Transactional
    public Member getMyInfoBySecurity() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        log.debug("currentMemberId = {}", currentMemberId);
        return memberRepository.findById(currentMemberId)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    @PostConstruct
    public void init() {
        Member member = Member.builder()
                .id("admin")
                .password(passwordEncoder.encode("admin"))
                .email("admin@ascentic.com")
                .image("관리자 이미지")
                .name("관리자")
                .birthDate("0101")
                .phone("010-0000-0000")
                .role(Collections.singletonList("ADMIN"))
                .build();
        memberRepository.save(member);
    }
}