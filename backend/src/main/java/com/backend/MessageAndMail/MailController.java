package com.backend.MessageAndMail;


import com.backend.member.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@RequestMapping("/mail")
public class MailController {
    private JavaMailSender mailSender;
    @Autowired
    public MailController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    @GetMapping("/send")
    public void sendMail(Member member, String tempPassword, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(member.getEmail());
        message.setSubject("[a]scentic - " + name + "님의 임시 비밀번호");
        message.setText("임시 비밀번호는 " + tempPassword + "입니다.");
        mailSender.send(message);
    }

}