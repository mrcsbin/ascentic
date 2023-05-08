package com.backend.member.jwt;

import com.backend.member.dto.JwtTokenDto;
import com.backend.member.entity.Member;
import com.backend.member.service.MemberDetailsService;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {

    private final String SECRET_KEY;

    private final long EXPIRATION_TIME;

    @Autowired
    private MemberDetailsService memberDetailsService;

    public JwtTokenProvider(@Value("${jwt.secret-key}") String SECRET_KEY, @Value("${jwt.token-validity-in-seconds}") long EXPIRATION_TIME) {
        this.SECRET_KEY = SECRET_KEY;
        this.EXPIRATION_TIME = EXPIRATION_TIME * 1000;
    }


    /* // 토큰 생성 V1
    public String generateToken(Member member) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(member.getId())
                .claim("role", member.getRole())
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    */

    // 토큰 생성 V2
    public JwtTokenDto generateToken(Member member) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + EXPIRATION_TIME);

        String accessToken = Jwts.builder()
                .setSubject(member.getId())
                .claim("role", member.getRole())
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();

        // 리프레시 토큰 시간 설정 다르게 해야됨
        String refreshToken = Jwts.builder()
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();

        return JwtTokenDto.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public Authentication getAuthentication(String jwtToken) {
        UserDetails userDetails = memberDetailsService.loadUserByUsername(this.getIdFromToken(jwtToken));
        log.debug("getAuthentication() 에서 생성한 User 권한 정보 : {}", userDetails);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getIdFromToken(String jwtToken) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(jwtToken).getBody().getSubject();
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("유효하지 않은 토큰", e);
        } catch (ExpiredJwtException e) {
            log.info("만료된 토큰", e);
        } catch (UnsupportedJwtException e) {
            log.info("지원하지 않는 토큰", e);
        } catch (IllegalArgumentException e) {
            log.info("값이 없는 토큰", e);
        }
        return false;
    }
}
