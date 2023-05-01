package com.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration // 스프링의 환경설정 파일임을 의미하는 어노테이션
@EnableWebSecurity // 모든 요청 URL이 스프링 시큐리티의 제어를 받도록 만드는 어노테이션
@EnableMethodSecurity(prePostEnabled = true) // 어노테이션을 기반으로 보안 동작하도록 설정
public class SecurityConfig {
	@Bean // 빈 객체를 만든다.
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests().requestMatchers(
				new AntPathRequestMatcher("/**")).permitAll() // 모든 인증되지 않은 요청을 허락한다는 의미
			.and()
				.headers()
				.addHeaderWriter(new XFrameOptionsHeaderWriter(
					// 사이트의 콘텐츠가 다른 사이트에 포함되지 않도록 하기 위해 X-Frame-Oprions 헤더값을 사용하여 이를 방지한다.
					// URL 요청시 X-Frame-Options 헤더값을 sameorigin으로 설정하여 오류가 발생하지 않는다.
					XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN))
			.and()
				.formLogin()
				.loginPage("/user/login") // 스프링 시큐리티의 로그인 설정을 담당하는 부분. 로그인 페이지 url
				.defaultSuccessUrl("/question/list") // 로그인 성공지 이동할 url
			.and()
				.logout()
				.logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
				.logoutSuccessUrl("/user/login")
				.invalidateHttpSession(true); // 로그아웃시 생성된 사용자 세션도 삭제

			return http.build();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() { 
		return new BCryptPasswordEncoder(); // 해싱함수를 이용해서 암호화하는 기능을 가진 객체
	}
	
	// UserSecurityService를 스프링 시큐리티에 등록하는 부분
	// AuthenticationManager 빈 생성시 스프링의 내부 동작으로 인해 위에서 작성한 UserSecurityService와 PasswordEncoder가 자동으로 설정된다.
	// AuthenticationManager는 스프링 시큐리티의 인증을 담당
	@Bean
	AuthenticationManager authenticationManger(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
}
