package com.backend.productimage.controller;

import com.backend.productimage.service.ProductImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping
@RestController
@RequiredArgsConstructor
public class ProductImageController {

    private final ProductImageServiceImpl productImgService;

    // 1. 상품번호, 2. 이미지(multipart), 3. 이미지 타입,
    @PostMapping("/uploadImage")
    public void uploadImage(@RequestParam("uploadFiles") MultipartFile[] uploadFiles,@RequestParam("prodNum") Integer prodNum,
                            @RequestParam("prodImageType") Integer prodImageType) throws IOException {
        productImgService.saveImages(uploadFiles, prodNum, prodImageType);
    }
}
