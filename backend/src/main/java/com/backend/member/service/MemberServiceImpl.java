package com.backend.member.service;

import com.backend.member.dto.*;
import com.backend.messageandmail.controller.MailController;
import com.backend.member.entity.Member;
import com.backend.member.jwt.JwtTokenProvider;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.jwt.TempPasswordGenerator;
import com.backend.member.repository.MemberRepository;
import com.backend.wish.entity.Wish;
import com.backend.wish.repository.WishRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
    private final MailController mailController;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final WishRepository wishRepository;

    @Override
    @Transactional
    public void join(SignupDto signupDto) {
        if (memberRepository.existsById(signupDto.getId())) {
            throw new RuntimeException("이미 존재하는 아이디");
        }
        if (memberRepository.existsByEmail(signupDto.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일");
        }
        if (memberRepository.existsByPhone(signupDto.getPhone())) {
            throw new RuntimeException("이미 존재하는 휴대폰");
        }

        Member member = Member.builder()
                .id(signupDto.getId())
                .name(signupDto.getName())
                .email(signupDto.getEmail())
                .memberPoint(0)
                .phone(signupDto.getPhone())
                .password(passwordEncoder.encode(signupDto.getPassword()))
                .role(Collections.singletonList("USER"))
                .birthDate(signupDto.getBirthDate())
                .infoAgree(signupDto.isInfoAgree())
                .emailPushYn(signupDto.isEmailPush())
                .snsPushYn(signupDto.isSnsPush())
                .build();
        memberRepository.save(member);
    }

    @Override
    public boolean existMemberId(String memberId) {
        return memberRepository.existsById(memberId);
    }

    @Override
    public boolean existEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    @Override
    public boolean existPhone(String phone) {
        return memberRepository.existsByPhone(phone);
    }

    @Override
    @Transactional
    public String updateMember(UpdateMemberDto updateMemberDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member member = memberRepository.findById(currentMemberId).orElseThrow(() -> new IllegalArgumentException("해당회원이 존재하지 않음"));
        if (passwordEncoder.matches(updateMemberDto.getPassword(), member.getPassword())) {
            member.changeEncodedPassword(passwordEncoder.encode(updateMemberDto.getNewPassword()));
            memberRepository.save(member);
            return "비밀번호가 변경되었습니다.";
        } else {
            return "현재 비밀번호가 일치하지 않습니다.";
        }
    }

    @Override
    @Transactional
    public void deleteMemberV1(Member member) {
        memberRepository.save(member);
    }

    @Override
    @Transactional
    public String deleteMemberV2(DeleteMemberDto deleteMemberDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member member = memberRepository.findById(currentMemberId).orElseThrow(() -> new IllegalArgumentException("해당회원이 존재하지 않음"));
        if (passwordEncoder.matches(deleteMemberDto.getPassword(), member.getPassword())) {
            memberRepository.deleteById(currentMemberId);
            return "탈퇴가 완료 되었습니다.";
        } else {
            return "비밀번호가 일치하지 않습니다.";
        }
    }

    @Override
    @Transactional(readOnly = true)
    public JwtTokenDto doLogin(LoginDto loginDto) {
        Optional<Member> findData = memberRepository.findById(loginDto.getId());
        if (findData.isPresent()) {
            Member member = findData.get();
            if (passwordEncoder.matches(loginDto.getPassword(), member.getPassword()) && loginDto.getId().equals(member.getId())) {
                JwtTokenDto jwtTokenDto = jwtTokenProvider.generateToken(member);
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
        Optional<Member> member = memberRepository.findByEmailAndPhone(findDataDto.getEmail(), findDataDto.getPhone());
        Optional<Member> sendTo = memberRepository.findEmailByPhone(findDataDto.getPhone());
        String tempPassword = TempPasswordGenerator.generateRandomPassword(10);
        if (member.isPresent()) {
            changeTempPw(member.get(), tempPassword);
            // 이메일 전송
            mailController.sendMail(sendTo.get(), tempPassword, member.get().getName());
            System.out.println(tempPassword);
            System.out.println(member.get().getName());
            System.out.println(sendTo.get());
            System.out.println("======================================================");
            return "성공";
        }
        else return "실패";

    }

    @Override
    public MemberInfoDto getMemberInfo() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        Member findMember = memberRepository.findById(currentMemberId)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        String[] emailParts = findMember.getEmail().split("@");

        return MemberInfoDto.builder()
                .email(emailParts[0])
                .domain(emailParts[1])
                .name(findMember.getName())
                .tel(findMember.getPhone())
                .build();
    }


    @Transactional
    public void changeTempPw(Member member, String tempPassword) {
        member.changeEncodedPassword(passwordEncoder.encode(tempPassword));
        memberRepository.save(member);
    }

    @Transactional
    public Member getMyInfoBySecurity() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        log.debug("currentMemberId = {}", currentMemberId);
        return memberRepository.findById(currentMemberId)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    @Override
    public MemberResponse.MyPageDto getMyPageProfile() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member member = memberRepository.findById(currentMemberId).orElseThrow(() -> new IllegalArgumentException("회원정보 없음"));
        List<Wish> wishList = wishRepository.findAllByMemberId(currentMemberId);
        return MemberResponse.MyPageDto.of(member, wishList.size());
    }

    @PostConstruct
    public void init() {
        Member member = Member.builder()
                .id("admin")
                .password(passwordEncoder.encode("djtpsxlr12!@"))
                .email("admin@ascentic.com")
                .name("관리자")
                .birthDate("0101")
                .memberPoint(0)
                .phone("01100000000")
                .role(Collections.singletonList("ADMIN"))
                .build();
        memberRepository.save(member);

        Member member1 = Member.builder()
                .id("sungbin")
                .password(passwordEncoder.encode("djtpsxlr12!@"))
                .email("test1@ascentic.com")
                .memberPoint(0)
                .name("조성빈")
                .birthDate("0101")
                .phone("01100000001")
                .role(Collections.singletonList("USER"))
                .build();
        memberRepository.save(member1);

        Member member2 = Member.builder()
                .id("hansic")
                .password(passwordEncoder.encode("djtpsxlr12!@"))
                .email("test2@ascentic.com")
                .memberPoint(0)
                .name("조한식")
                .birthDate("0101")
                .phone("01100000002")
                .role(Collections.singletonList("USER"))
                .build();
        memberRepository.save(member2);

        Member member3 = Member.builder()
                .id("kyungmin")
                .password(passwordEncoder.encode("djtpsxlr12!@"))
                .email("test3@ascentic.com")
                .memberPoint(0)
                .name("강경민")
                .birthDate("0101")
                .phone("01100000003")
                .role(Collections.singletonList("USER"))
                .build();
        memberRepository.save(member3);

        Member member4 = Member.builder()
                .id("haesung")
                .password(passwordEncoder.encode("djtpsxlr12!@"))
                .email("test4@ascentic.com")
                .memberPoint(0)
                .name("나해성")
                .birthDate("0101")
                .phone("01100000004")
                .role(Collections.singletonList("USER"))
                .build();
        memberRepository.save(member4);

        Member member5 = Member.builder()
                .id("chaeeun")
                .password(passwordEncoder.encode("djtpsxlr12!@"))
                .email("test5@ascentic.com")
                .memberPoint(0)
                .name("전채은")
                .birthDate("0101")
                .phone("01100000005")
                .role(Collections.singletonList("USER"))
                .build();
        memberRepository.save(member5);

        Member member6 = Member.builder()
                .id("sungmin")
                .password(passwordEncoder.encode("djtpsxlr12!@"))
                .email("test6@ascentic.com")
                .memberPoint(0)
                .name("황성민")
                .birthDate("0101")
                .phone("01100000006")
                .role(Collections.singletonList("USER"))
                .build();
        memberRepository.save(member6);
    }

    @Override
    public void updateProfileImg(MultipartFile profileImg) throws IOException {
        if (profileImg.isEmpty()) return;

        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        File storedFilename = new File(UUID.randomUUID().toString() + "_" + profileImg.getOriginalFilename());
        Member member = memberRepository.findById(currentMemberId).orElseThrow(() -> new IllegalArgumentException("회원정보 없음"));
        member.setImage(storedFilename.toString());
        profileImg.transferTo(storedFilename);
        memberRepository.save(member);
    }

    @Override
    public void delProfileImg() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member member = memberRepository.findById(currentMemberId).orElseThrow(() -> new IllegalArgumentException("화원 정보 없음"));
        member.setImage(null);

        memberRepository.save(member);
    }

    @Override
    public void updatePushYn(PushYnDto pushYnDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member member = memberRepository.findById(currentMemberId).orElseThrow(() -> new IllegalArgumentException("화원 정보 없음"));
        member.setSnsPushYn(pushYnDto.getSnsPushYn());
        member.setEmailPushYn(pushYnDto.getEmailPushYn());

        memberRepository.save(member);
    }

    @Override
    public Integer getPoint() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Member member = memberRepository.findById(currentMemberId).orElseThrow(() -> new IllegalArgumentException("회원 정보 없음"));
        return member.getMemberPoint();
    }

    @Override
    public boolean isExistMember(String name, String phone) {
        return memberRepository.existsByNameAndPhone(name, phone);
    }
}