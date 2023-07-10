package com.backend.member.dto;

import com.backend.member.entity.Member;
import com.backend.order.dto.PaymentRes;
import lombok.Builder;
import lombok.Getter;

public class MemberResponse {

    @Getter
    @Builder
    public static class MyPageDto {
        private String profileName;
        private String profileEmail;
        private Integer wishCount;
        private String profileImage;
        private Integer point;

        public static MyPageDto of(Member member, Integer wishCount) {
            return MyPageDto.builder()
                    .profileName(member.getName())
                    .profileEmail(member.getEmail())
                    .wishCount(wishCount)
                    .profileImage(member.getImage())
                    .point(member.getMemberPoint())
                    .build();
        }
    }

}
