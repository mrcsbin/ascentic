package net.nurigo.gradlespringdemo.test;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
public class UserApiController {

    //인증번호 발송
    @PostMapping("/sms-certification/sends")
    public ResponseEntity<Void> sendSms(@RequestBody SmsCertificationRequest requestDto) {
        smsCertificationService.sendSms(requestDto.getPhone());
        return CREATED;
    }

    //인증번호 확인
    @PostMapping("/sms-certification/confirms")
    public ResponseEntity<Void> SmsVerification(@RequestBody SmsCertificationRequest requestDto) {
        smsCertificationService.verifySms(requestDto);
        return OK;
    }
}