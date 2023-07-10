package com.backend.inquiry.service;


import com.backend.inquiry.dto.request.CommentInquiryDto;
import com.backend.inquiry.dto.request.CreateInquiryDto;
import com.backend.inquiry.dto.response.InquiryDto;
import com.backend.inquiry.entity.Inquiry;

import java.util.List;

public interface InquiryService {
    List<InquiryDto> getInquiry();

    void createInquiry(CreateInquiryDto createInquiryDto);

    void updateInquiry(CommentInquiryDto commentInquiryDto);

    List<Inquiry> getAdminInquiry();

    List<Inquiry> getNewInquiryList();
}
