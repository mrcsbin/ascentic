package com.backend.smsCertificate;

import com.backend.member.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Random;

@RequiredArgsConstructor
@RestController
@RequestMapping("/smsapi")
public class VerificationController {
    private final MemberServiceImpl memberServiceImpl;
    private final RedisTemplate<String, String> redisTemplate;
    private final SmsCertificateController smsCertificateController;

    @GetMapping("/sendCode")
    public ResponseEntity<String> generateVerificationCode(@RequestParam("phoneNumber") String phoneNumber) {
        if (phoneNumber == null) {
            return ResponseEntity.badRequest().body("휴대폰 번호가 입력되지 않았습니다.");
        }

        // 6자리의 난수 생성
        String verificationCode = generateRandomCode(6);

        // Redis에 휴대폰 번호와 인증코드 저장, 유효기간 3분
        redisTemplate.opsForValue().set(phoneNumber, verificationCode, Duration.ofMinutes(3));
        smsCertificateController.sendOne(phoneNumber);

        // 성공적으로 저장되었다는 응답을 전송합니다.
        return ResponseEntity.ok("redis에 저장 완료");

    }
    @GetMapping("/checkCode")
    public ResponseEntity checkVerificationCode(@RequestParam("phoneNumber") String phoneNumber, @RequestParam("code") String code) {
        if (phoneNumber == null || code == null) {

            return ResponseEntity.badRequest().body(false);
        }

        // Redis에서 해당 휴대폰 번호에 대한 인증번호 조회
        String storedCode = redisTemplate.opsForValue().get(phoneNumber);

        if (storedCode != null && storedCode.equals(code)) {
            // 인증번호가 일치하는 경우
            if(memberServiceImpl.existPhone(phoneNumber)){
                return ResponseEntity.ok("duplicateNum");
            }
            return ResponseEntity.ok("Ok");
        } else {
            // 인증번호가 일치하지 않는 경우
            return ResponseEntity.ok("Wrong");
        }
    }

    private String generateRandomCode(int len) {
        Random rand = new Random();
        String numStr = ""; //난수가 저장될 변수
        for(int i=0;i<len;i++) {
            //0~9 까지 난수 생성
            String ran = Integer.toString(rand.nextInt(10));
                numStr += ran;
        }
        return numStr;
    }
}
