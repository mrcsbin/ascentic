package com.backend.smsCertificate;

import com.backend.member.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Random;

@RequiredArgsConstructor
@RestController
@RequestMapping("/smsapi")
public class VerificationController {
    private final MemberServiceImpl memberServiceImpl;
    private final RedisTemplate<String, String> redisTemplate;
    private final SmsCertificateController smsCertificateController;


@PostMapping("/sendCode")
public ResponseEntity<String> generateVerificationCode(@RequestBody String phoneNumber) {
    System.out.println("phoneNumber:"+phoneNumber);
    if (phoneNumber == null) {
        return ResponseEntity.badRequest().body("휴대폰 번호가 입력되지 않았습니다.");
    }

    // Redis에서 해당 휴대폰 번호의 인증 횟수 조회

    String verificationCountKey = phoneNumber + ":count";
    String verificationCountStr = redisTemplate.opsForValue().get(verificationCountKey);
    int verificationCount = verificationCountStr != null ? Integer.parseInt(verificationCountStr) : 0;
    if (verificationCount >= 3) {
        return ResponseEntity.ok("인증 횟수를 초과하였습니다. 1시간 후에 다시 시도 바랍니다.");
    }

    // 6자리의 난수 생성
    String verificationCode = generateRandomCode(6);

    // Redis에 휴대폰 번호와 인증코드 저장, 유효기간 3분 5초 => 서버에서 프론트로 넘기는 시간 오차 생각
    String verificationCodeKey = phoneNumber + ":code";
    redisTemplate.opsForValue().set(verificationCodeKey, verificationCode, Duration.ofSeconds(185));

    System.out.println(redisTemplate.opsForValue().get(phoneNumber +":code"));
    // 인증 횟수 업데이트 (인증 횟수가 없을 경우 1로 초기화)
    if (verificationCount == 0) {
        redisTemplate.opsForValue().set(verificationCountKey, "1", Duration.ofHours(1));
    } else {
        redisTemplate.opsForValue().increment(verificationCountKey);
    }

    smsCertificateController.sendOne(phoneNumber);

    // 성공적으로 저장되었다는 응답 전송
    return ResponseEntity.ok("문자가 발송되었습니다. 3분안에 인증번호를 입력하세요. (1시간 이내에 같은 번호로는 3번까지 인증번호 요청이 가능합니다.)");
}



    @PostMapping("/checkCode")
    public ResponseEntity checkVerificationCode(@RequestBody HashMap<String, String> req) {
        String phoneNumber = req.get("phoneNumber");
        String code= req.get("code");

        if (phoneNumber == null || code == null) {
            return ResponseEntity.badRequest().body(false);
        }

        // Redis에서 해당 휴대폰 번호에 대한 인증번호 조회
        String storedCode = redisTemplate.opsForValue().get(phoneNumber +":code");
        System.out.println(phoneNumber + code);

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
