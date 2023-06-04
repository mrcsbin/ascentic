package com.backend.member.dto;

import com.backend.member.entity.Member;
import com.backend.wish.entity.Wish;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class MemberResponse {

    @Getter
    @Builder
    public static class MyPageDto {
        private String profileName;
        private String profileEmail;
        private Integer wishCount;

        public static MyPageDto of(Member member, Integer wishCount) {

            return MyPageDto.builder()
                    .profileName(member.getName())
                    .profileEmail(member.getEmail())
                    .wishCount(wishCount)
                    .build();
        }
    }

}
