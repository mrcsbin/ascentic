package com.backend.adminPost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
public class AdminPostController {
    private AdminPostService adminPostService;

    @Autowired
    public AdminPostController(AdminPostService adminPostService) {

        this.adminPostService = adminPostService;
    }

    @PostMapping("/post")
    public AdminPost createPost(@RequestBody AdminPost adminPost) {
        return adminPostService.createAdminPost(adminPost);
    }

    @GetMapping("/posts")
    public List<AdminPost> getPosts(String category) {
        return adminPostService.getAdminPostsByCategory(category);
    }

    @GetMapping("/post/{id}")
    public AdminPost getPost(@PathVariable Long id) {
        return adminPostService.getAdminPost(id);
    }
    @DeleteMapping("/post/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        // 게시물 삭제 로직 구현
        boolean deleted = adminPostService.deleteAdminPost(id);

        if (deleted) {
            return ResponseEntity.ok().body("삭제 성공");
        } else {
            return ResponseEntity.badRequest().body("삭제 실패");
        }
    }
    @GetMapping("/getevent")
    public AdminPost getLatestPost() {
        String category = "event";
        List<AdminPost> posts = adminPostService.getAdminPostsByCategory(category);
        if (!posts.isEmpty()) {
            return posts.get(posts.size() - 1); // 마지막 글을 반환
        } else {
            return null; // 글이 없을 경우 null 반환 또는 예외 처리
        }
    }
    @PutMapping("/{id}") //멱등성
    public AdminPost updatePost(@PathVariable Long id, @RequestBody AdminPost adminPost) {
        return adminPostService.updateAdminPost(id, adminPost);
    }
    @Value("${spring.servlet.multipart.location}")
    private String uploadPath;

    @PostMapping("/mainimg") //uploadPath 안에 admin_mainimg 폴더 추가필요!!!!!
    public ResponseEntity<String> uploadMainImage(@RequestParam("image") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("No file uploaded");
            }

            // 파일명을 고유한 값으로 생성
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Path.of(uploadPath, "admin_mainimg", fileName);

            // 파일 저장
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // 파일명 반환
            return ResponseEntity.ok().body(fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/download")
    public ResponseEntity<UrlResource> download(@RequestParam("img") String fileName) throws MalformedURLException {
        Path filePath = Path.of(uploadPath, "admin_mainimg", fileName);
        UrlResource resource = new UrlResource(filePath.toUri());
        return ResponseEntity.ok().body(resource);
}
//    <img src={`http://localhost:8080/admin/download?img=${selectedImage}`} alt="대표 이미지"style={{ maxWidth: "300px" }}/> 리액트에서 이벤트 메인이미지 불러오기
}






