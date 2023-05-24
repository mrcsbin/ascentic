package com.backend.productimg.controller;

import com.backend.productimg.service.ProductImgServiceImpl;
import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.UrlResource;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

@RequestMapping
@RestController
@RequiredArgsConstructor
public class ProductImgController {

    private final ProductImgServiceImpl productImgService;

    // 1. 상품번호, 2. 이미지(multipart), 3. 이미지 타입,
    @PostMapping("/uploadImage")
    public void uploadImage(@RequestParam("uploadFiles") MultipartFile[] uploadFiles,@RequestParam("prodNum") Integer prodNum,
                            @RequestParam("prodImageType") Integer prodImageType) throws IOException {
        productImgService.saveImages(uploadFiles, prodNum, prodImageType);
    }
}
