package com.backend.adminPost;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class AdminPostListDTO {
    private Long postId;


    private String postCategory;


    private String postTitle;


    // 0: 저장 1: 임시저장 2: 삭제
    private Integer postStatus;


    private String postImage;


    private LocalDate eventStartDate;


    private LocalDate eventEndDate;
}
