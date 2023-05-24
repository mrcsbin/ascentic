package com.backend.inquiry.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_inquiry")
@Builder
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inquiry_num")
    private Integer inquiryNum;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "inquiry_title")
    private String inquiryTitle;

    @Column(name = "inquiry_content")
    private String inquiryContent;

    @CreationTimestamp
    @Column(name = "inquiry_date")
    private LocalDateTime inquiryDate;

    @Column(name = "inquiry_category")
    private String inquiryCategory;

    @Column(name = "inquiry_comment")
    private String inquiryComment;

    @Column(name = "inquiry_state")
    private Boolean inquiryState;

    @Column(name = "comment_date")
    private LocalDateTime commentDate;
}
