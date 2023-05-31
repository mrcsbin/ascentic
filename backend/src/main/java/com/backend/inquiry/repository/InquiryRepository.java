package com.backend.inquiry.repository;

import com.backend.inquiry.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {
    List<Inquiry> findByMemberId(String memberId);

    List<Inquiry> findAllByInquiryCommentIsNull();

    List<Inquiry> findAllByInquiryCommentIsNotNull();
}
