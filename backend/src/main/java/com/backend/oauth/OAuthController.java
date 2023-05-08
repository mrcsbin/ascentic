//package com.backend.oauth;
//
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//
//import java.io.IOException;
//
//@Controller
//@AllArgsConstructor
//@RequestMapping("/oauth")
//public class OAuthController {
//    private final OAuthService oAuthService;
//
//    private final MemberServiceImpl memberService;
//
//    @ResponseBody
//    @GetMapping("/kakao")
//    public String kakaoCallBack(@RequestParam String code) {
//        System.out.println(code);
//        String redirectUri = "http://localhost:3000";
//        String accessToken = oAuthService.getKaKaoAccessToken(code);
//        Member kakaoMember = oAuthService.createKakaoMember(accessToken);
//        memberService.insertUser(kakaoMember);
//        return "성공";
////        response.sendRedirect(redirectUri);
////        return "redirect:" + redirectUri;
//    }
//}