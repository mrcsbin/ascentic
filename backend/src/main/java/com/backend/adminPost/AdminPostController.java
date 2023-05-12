package com.backend.adminPost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
public class AdminPostController {
    private AdminPostService adminPostService;

    @Autowired
    public AdminPostController(AdminPostService adminPostService) {
        File directory = new File(uploadPath + "\\admin_mainimg");
        if (!directory.exists()) {
            directory.mkdirs();
        }//admin_mainimg 폴더 없으면 생성
        this.adminPostService = adminPostService;
    }

    @PostMapping("/post")
    public AdminPost createPost(@RequestBody AdminPost adminPost) {
        return adminPostService.createAdminPost(adminPost);
    }

    @GetMapping("/{id}")
    public AdminPost getPost(@PathVariable Long id) {
        return adminPostService.getAdminPost(id);
    }

    @PutMapping("/{id}")
    public AdminPost updatePost(@PathVariable Long id, @RequestBody AdminPost adminPost) {
        return adminPostService.updateAdminPost(id, adminPost);
    }
    @Value("${spring.servlet.multipart.location}")
    private String uploadPath;

    @PostMapping("/mainimg")
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
//    <img src={`http://localhost:8080/admin/download?img=${selectedImage}`} alt="대표 이미지"style={{ maxWidth: "300px" }}/> 리액트 메인이미지 불러오기
}






