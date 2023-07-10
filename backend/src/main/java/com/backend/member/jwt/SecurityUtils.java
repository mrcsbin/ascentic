package com.backend.member.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

@Slf4j
public class SecurityUtils {

    public static Optional<String> getCurrentMemberId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        log.debug("시큐리티 컨텍스트에 등록된 정보 : {}", authentication);
        if (authentication == null) {
            log.debug("시큐리티 컨텍스트 사용자 인증 X");
            return Optional.empty();
        }

        String id = null;
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            id = springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            id = (String) authentication.getPrincipal();
        }
        log.debug("현재 시큐리티 컨텍스트의 유저 아이디 : {}", id);

        return Optional.ofNullable(id);
    }
}