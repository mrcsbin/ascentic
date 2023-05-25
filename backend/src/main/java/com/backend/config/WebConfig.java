package com.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  // 설정 파일임을 알려줌
public class WebConfig implements WebMvcConfigurer {

    @Value("${spring.servlet.multipart.location}")
    String uploadDir;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // registry.addMapping을 이용해서 CORS를 적용할 URL패턴을 정의
        registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedOrigins("*"); // allowedOrigins 메소드를 이용해서 자원 공유를 허락할 Origin을 지정.는 모든것을 허용
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:///" + uploadDir + "/");
    }
}