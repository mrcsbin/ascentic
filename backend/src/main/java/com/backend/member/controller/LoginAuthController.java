package com.backend.member.controller;

import com.backend.member.dto.JwtTokenDto;
import com.backend.member.entity.Member;
import com.backend.member.service.LoginAuthService;
import com.backend.member.service.MemberServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@AllArgsConstructor
@RequestMapping("/oauth")
public class LoginAuthController {

    private final LoginAuthService loginAuthService;
    private final MemberServiceImpl memberService;

    @ResponseBody
    @GetMapping("/kakao")
    public JwtTokenDto kakaoCallBack(@RequestParam String code) {
        String redirectUri = "http://localhost:3000";
        String accessToken = loginAuthService.getKaKaoAccessToken(code);
        JwtTokenDto jwtTokenDto = loginAuthService.createKakaoMember(accessToken);
        System.out.println("jwtTokenDto = " + jwtTokenDto);

        return jwtTokenDto;
//        response.sendRedirect(redirectUri);
//        return "redirect:" + redirectUri;
    }
}