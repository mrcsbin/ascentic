package com.backend.productimg.controller;

import com.backend.product.Product;
import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.UrlResource;
import com.backend.productimg.service.ProductImgServiceImpl;
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

    @GetMapping ("/getProdImg")
    public ResponseEntity<UrlResource> downloadImg(@Param("prodNum") Integer prodNum, @Param("prodImageType") Integer prodImageType) throws MalformedURLException {
        UrlResource resource = productImgService.findImage(prodNum, prodImageType);
        return ResponseEntity.ok().body(resource);
    }

    @GetMapping("/getProdImgDetailPage/{prodNum}/{prodImageType}")
    public List<String> downloadImages(@PathVariable("prodNum") Integer prodNum, @PathVariable("prodImageType") Integer prodImageType) throws MalformedURLException {
        List<String> resources = productImgService.findImages(prodNum, prodImageType);
        return resources;
    }

    //이미지 리스트에서 한장씩 다운받을때 사용
    @RequestMapping({"/download"})
    public ResponseEntity<UrlResource> download(@RequestParam("img") String stored) throws MalformedURLException {
        UrlResource resource = new UrlResource(stored);
        return ResponseEntity.ok().body(resource);
    }
}
