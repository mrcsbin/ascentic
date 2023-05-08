package com.backend.smsCertificate;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "smsapi")
public class SmsApiInfo {
    private String key;
    private String secret;
}
