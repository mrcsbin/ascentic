package com.backend.productImg;

import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

public interface ProductImgService {
    public UrlResource findImage(Integer prodNum, Integer prodImageType) throws MalformedURLException;
    public void saveImages(MultipartFile[] uploadFiles, Integer prodNum, Integer prodImageType) throws IOException;
}
