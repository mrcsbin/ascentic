package com.backend.inquiry.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
@AllArgsConstructor
public class CommentInquiryDto {
    private Integer inquiryNum;
    private String inquiryComment;
}
