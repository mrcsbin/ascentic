package com.backend.inquiry.controller;

import com.backend.inquiry.dto.request.CommentInquiryDto;
import com.backend.inquiry.dto.request.CreateInquiryDto;
import com.backend.inquiry.dto.response.InquiryDto;
import com.backend.inquiry.service.InquiryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequestMapping("/inquiry")
@RestController
@RequiredArgsConstructor
public class InquiryController {
    private final InquiryServiceImpl inquiryService;

    @GetMapping("/getInquiry") // 회원 아이디에 해당하는 문의 내역 조회
    public List<InquiryDto> getInquiry() {
        return inquiryService.getInquiry();
    }

    @PostMapping("/createInquiry") // 1:1 문의 생성
    public void createInquiry(@RequestBody CreateInquiryDto createInquiryDto) {
        inquiryService.createInquiry(createInquiryDto);
    }

    @PostMapping("/commentInquiry") // 1:1 문의 답변(관리자)
    public void updateInquiry(@RequestBody CommentInquiryDto commentInquiryDto) {
        System.out.println(commentInquiryDto.getInquiryComment());
        System.out.println(commentInquiryDto.getInquiryNum());
        System.out.println("GGGG");
        inquiryService.updateInquiry(commentInquiryDto);
    }
}
