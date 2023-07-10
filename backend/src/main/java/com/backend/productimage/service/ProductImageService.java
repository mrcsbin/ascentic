package com.backend.productimage.service;

import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

public interface ProductImageService {
    public UrlResource findImage(Integer prodNum, Integer prodImageType) throws MalformedURLException;

    public List<String> findImages(Integer prodNum, Integer prodImageType) throws MalformedURLException;

//    public void saveImages(MultipartFile[] uploadFiles, Integer prodNum, Integer prodImageType) throws IOException;

    void uploadImage(MultipartFile thumbnail, MultipartFile[] imageFiles, Integer prodNum) throws IOException;
}
