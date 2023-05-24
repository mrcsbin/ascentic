package com.backend.productimg;

import com.backend.product.repository.ProductRepository;
import com.backend.productimg.entity.ProductImg;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.net.MalformedURLException;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProductImgServiceImpl implements com.backend.productimg.service.ProductImgService {

    //	application.yml(설정파일)에 설정된 내용을 주입시켜주는 어노테이션
    @Value("${spring.servlet.multipart.location}")
    String uploadDir;

    private final ProdImgRepository prodImgRepository;
    private final ProductRepository productRepository;

    // 프론트에서 이미지를 조회할 때
    public UrlResource findImage(Integer prodNum, Integer prodImageType) throws MalformedURLException {
        // DB에 prodNum과 prodImageType에 해당하는 ProductImg(이미지번호, 상품번호, 이미지저장명, 이미지 업로드명, 이미지 업로드 날짜, 이미지 타입)를 조회
        ProductImg img = prodImgRepository.findTopByProdNumAndProdImageType(prodNum, prodImageType);

        // 저장명에 일치하는 파일을 찾는다.
        UrlResource urlResource = new UrlResource("file:" + uploadDir + "/" + img.getProdSaveName());
        return urlResource;
    }


    //같은 타입의 이미지를 여러장 뽑을 때 사용
    public List<String> findImages(Integer prodNum, Integer prodImageType) throws MalformedURLException {
        // DB에서 prodNum과 prodImageType에 해당하는 모든 ProductImg(이미지번호, 상품번호, 이미지저장명, 이미지 업로드명, 이미지 업로드 날짜, 이미지 타입)를 조회
        List<ProductImg> images = prodImgRepository.findAllByProdNumAndProdImageType(prodNum, prodImageType);

        List<String> imageNames = new ArrayList<>();
        for (ProductImg img : images) {
            imageNames.add("file:" + uploadDir + "/" + img.getProdSaveName());
        }

        return imageNames;
    }


    // 상품이미지를 등록할 때
    public void saveImages(MultipartFile[] uploadFiles, Integer prodNum, Integer prodImageType) throws IOException {
        for (MultipartFile file : uploadFiles) {
            if (!file.isEmpty()) {
                File storedFilename = new File(UUID.randomUUID().toString() + "_" + file.getOriginalFilename()); // 저장명을 지정
                ProductImg productImg = new ProductImg();
                productImg.setProduct(productRepository.findById(prodNum).orElse(null));
                productImg.setProdSaveName(storedFilename.toString()); // 저장명 set
                productImg.setProdUploadName(file.getOriginalFilename()); // 업로드명 set
                productImg.setProdImageType(prodImageType);
                prodImgRepository.save(productImg); // DB에 저장
                file.transferTo(storedFilename); //이미지 파일을 서버에 저장 (업로드)
            }
        }
    }
}
