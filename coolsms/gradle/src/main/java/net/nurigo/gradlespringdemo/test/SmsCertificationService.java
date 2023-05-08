package net.nurigo.gradlespringdemo.test;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static sun.security.ssl.X509KeyManagerImpl.CheckResult.OK;

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