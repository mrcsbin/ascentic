package com.backend.productImg;

import com.backend.product.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.UrlResource;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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

    @GetMapping ("/getProdImg")
    public ResponseEntity<UrlResource> downloadImg(Integer prodNum, Integer prodImageType) throws MalformedURLException {
        UrlResource resource = productImgService.findImage(prodNum, prodImageType);
        return ResponseEntity.ok().body(resource);
    }
}
