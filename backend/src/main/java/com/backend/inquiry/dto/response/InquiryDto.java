package com.backend.inquiry.dto.response;

import com.backend.inquiry.entity.Inquiry;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@Builder
@AllArgsConstructor
public class InquiryDto {
    private String inquiryTitle;
    private String inquiryContent;
    private LocalDateTime inquiryDate;
    private String inquiryCategory;
    private String inquiryComment;
    private Boolean inquiryState;
    private LocalDateTime commentDate;

    public static InquiryDto of(Inquiry inquiry) {
        return new InquiryDto(inquiry.getInquiryTitle(),
                inquiry.getInquiryContent(),
                inquiry.getInquiryDate(),
                inquiry.getInquiryCategory(),
                inquiry.getInquiryComment(),
                inquiry.getInquiryState(),
                inquiry.getCommentDate());
    }
}
