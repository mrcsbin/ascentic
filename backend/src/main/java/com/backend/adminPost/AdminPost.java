package com.backend.adminPost;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_admin_posts")
public class AdminPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_post_id")
    private Long postId;

    @Column(nullable = false, name = "admin_post_category")
    private String postCategory;

    @Column(nullable = false, name = "admin_post_title")
    private String postTitle;
    @Column(nullable = false, name = "admin_post_core_message")
    private String postCoreMessage;
    @Column(nullable = false, name = "admin_post_content", columnDefinition = "TEXT")
    private String postContent;

    @Column(nullable = false, name = "admin_post_status")
    // 0: 저장 1: 임시저장 2: 삭제
    private Integer postStatus;

    @Column(name = "admin_post_image")
    private String postImage;

    @Column(name = "admin_post_start_date")
    private LocalDate eventStartDate;

    @Column(name = "admin_post_end_date")
    private LocalDate eventEndDate;
}
