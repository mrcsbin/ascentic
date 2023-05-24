package com.backend.inquiry.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
@AllArgsConstructor
public class CreateInquiryDto {
    private String inquiryTitle;
    private String inquiryContent;
    private String inquiryCategory;
}
