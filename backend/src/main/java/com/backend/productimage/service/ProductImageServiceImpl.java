package com.backend.productimage.service;


import com.backend.product.repository.ProductRepository;
import com.backend.productimage.entity.ProductImage;
import com.backend.productimage.repository.ProductImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProductImageServiceImpl implements ProductImageService {

    //	application.yml(설정파일)에 설정된 내용을 주입시켜주는 어노테이션
    @Value("${spring.servlet.multipart.location}")
    String uploadDir;

    private final ProductImageRepository prodImgRepository;
    private final ProductRepository productRepository;

    // 프론트에서 이미지를 조회할 때
    public UrlResource findImage(Integer prodNum, Integer prodImageType) throws MalformedURLException {
        // DB에 prodNum과 prodImageType에 해당하는 ProductImg(이미지번호, 상품번호, 이미지저장명, 이미지 업로드명, 이미지 업로드 날짜, 이미지 타입)를 조회
        ProductImage img = prodImgRepository.findTopByProdNumAndProdImageType(prodNum, prodImageType);

        // 저장명에 일치하는 파일을 찾는다.
        UrlResource urlResource = new UrlResource("file:" + uploadDir + "/" + img.getProdSaveName());
        return urlResource;
    }


    //같은 타입의 이미지를 여러장 뽑을 때 사용
    public List<String> findImages(Integer prodNum, Integer prodImageType) throws MalformedURLException {
        // DB에서 prodNum과 prodImageType에 해당하는 모든 ProductImg(이미지번호, 상품번호, 이미지저장명, 이미지 업로드명, 이미지 업로드 날짜, 이미지 타입)를 조회
        List<ProductImage> images = prodImgRepository.findAllByProdNumAndProdImageType(prodNum, prodImageType);

        List<String> imageNames = new ArrayList<>();
        for (ProductImage img : images) {
            imageNames.add("file:" + uploadDir + "/" + img.getProdSaveName());
        }

        return imageNames;
    }


    // 상품이미지를 등록할 때
//    public void saveImages(MultipartFile[] uploadFiles, Integer prodNum, Integer prodImageType) throws IOException {
//        for (MultipartFile file : uploadFiles) {
//            if (!file.isEmpty()) {
//                File storedFilename = new File(UUID.randomUUID().toString() + "_" + file.getOriginalFilename()); // 저장명을 지정
//                ProductImage productImage = new ProductImage();
//                productImage.setProduct(productRepository.findById(prodNum).orElse(null));
//                productImage.setProdSaveName(storedFilename.toString()); // 저장명 set
//                productImage.setProdUploadName(file.getOriginalFilename()); // 업로드명 set
//                productImage.setProdImageType(prodImageType);
//                prodImgRepository.save(productImage); // DB에 저장
//                file.transferTo(storedFilename); //이미지 파일을 서버에 저장 (업로드)
//            }
//        }
//    }

    // 상품 이미지 등록
    @Override
    public void uploadImage(MultipartFile thumbnail, MultipartFile[] imageFiles, Integer prodNum) throws IOException {
        saveProdImg(thumbnail, prodNum, 0);

        for (MultipartFile file : imageFiles) {
            saveProdImg(file, prodNum, 1);
        }
    }

    private void saveProdImg(MultipartFile file, Integer prodNum, Integer prodImageType) throws IOException {
        if(file.isEmpty()) return;

        File storedFilename = new File(UUID.randomUUID().toString() + "_" + file.getOriginalFilename());
        prodImgRepository.save(ProductImage.builder()
                .product(productRepository.findById(prodNum).orElse(null))
                .prodSaveName(storedFilename.toString())
                .prodUploadName(file.getOriginalFilename())
                .prodImageType(prodImageType)
                .build());
        file.transferTo(storedFilename);
    }
}
