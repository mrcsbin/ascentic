package com.backend.subscribeproduct.service;


import com.backend.scent.repository.ScentRepository;
import com.backend.subscribeproduct.dto.SbProductReqDTO;
import com.backend.subscribeproduct.dto.admin.SbProdMemberRecordDto;
import com.backend.subscribeproduct.repository.SbProductRepository;
import com.backend.subscribeproduct.dto.SbProductDTO;
import com.backend.subscribeproduct.entity.SubscribeProduct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SbProductServiceImpl implements SbProductService{

    @Value("${spring.servlet.multipart.location}")
    String uploadDir;

    private final SbProductRepository sbProductRepository;
    private final ScentRepository scentRepository;
    @Override
    public void addSbProduct(MultipartFile file, SbProductReqDTO sbProductReqDTO) throws IOException {
            File storedFilename = new File(UUID.randomUUID().toString() + "_" + file.getOriginalFilename()); // 저장명을 지정
            file.transferTo(storedFilename); //이미지 파일을 서버에 저장 (업로드)
            SubscribeProduct subscribeProduct = SubscribeProduct.builder()
                    .scentName(scentRepository.findById(sbProductReqDTO.getScentName()).orElse(null))
                    .sbProdPrice(sbProductReqDTO.getSbProdPrice())
                    .sbProdIntro(sbProductReqDTO.getSbProdIntro())
                    .sbProdImage(storedFilename.toString())
                    .sbProdStock(sbProductReqDTO.getSbProdStock())
                    .build();
            sbProductRepository.save(subscribeProduct);
    }

    @Override
    public List<SbProductDTO> listSbProduct(String scentNoteName){
//        List<SbProductDTO> sbProductDTOList = new ArrayList<>();
//        if (scentNoteName.equals("all")) {
//            List<SubscribeProduct> sbProducts = sbProductRepository.findAll();
//            for (SubscribeProduct sbProduct : sbProducts) {
//                sbProductDTOList.add(SbProductDTO.builder()
//                        .sbProdNum(sbProduct.getSbProdNum())
//                        .scentName(sbProduct.getScentName())
//                        .sbProdPrice(sbProduct.getSbProdPrice())
//                        .sbProdIntro(sbProduct.getSbProdIntro())
//                        .sbProdImage(sbProduct.getSbProdImage())
//                        .build());
//            }
//        } else {
//            List<SubscribeProduct> sbProducts = sbProductRepository.findByScentNameScentNoteName(scentNoteName);
//            for (SubscribeProduct sbProduct : sbProducts) {
//                sbProductDTOList.add(SbProductDTO.builder()
//                        .sbProdNum(sbProduct.getSbProdNum())
//                        .scentName(sbProduct.getScentName())
//                        .sbProdPrice(sbProduct.getSbProdPrice())
//                        .sbProdIntro(sbProduct.getSbProdIntro())
//                        .sbProdImage(sbProduct.getSbProdImage())
//                        .build());
//            }
//        }
//        return sbProductDTOList;

        List<SubscribeProduct> sbProducts;
        if (scentNoteName.equals("all")) {
            sbProducts = sbProductRepository.findAll();
        } else {
            sbProducts = sbProductRepository.findByScentNameScentNoteName(scentNoteName);
        }
        return sbProducts.stream().map(
                sbProduct -> {
                    return SbProductDTO.of(sbProduct);
                }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateSbProduct(Integer sbProdNum, MultipartFile file, SbProductReqDTO sbProductReqDTO) throws IOException {
        if (file==null){
            SubscribeProduct sbProduct = sbProductRepository.findById(sbProdNum).orElse(null);
            sbProduct.updateSbProduct(
                    scentRepository.findById(sbProductReqDTO.getScentName()).orElse(null),
                    sbProductReqDTO.getSbProdPrice(), sbProductReqDTO.getSbProdIntro(),
                    sbProductReqDTO.getSbProdImage(), sbProductReqDTO.getSbProdStock());
        } else {
            File storedFilename = new File(UUID.randomUUID().toString() + "_" + file.getOriginalFilename()); // 저장명을 지정
            file.transferTo(storedFilename); //이미지 파일을 서버에 저장 (업로드)

            SubscribeProduct sbProduct = sbProductRepository.findById(sbProdNum).orElse(null);
            sbProduct.updateSbProduct(
                    scentRepository.findById(sbProductReqDTO.getScentName()).orElse(null),
                    sbProductReqDTO.getSbProdPrice(), sbProductReqDTO.getSbProdIntro(),
                    storedFilename.toString(), sbProductReqDTO.getSbProdStock());
        }
    }

    @Override
    public void deleteSbProduct(Integer sbProdNum){
        sbProductRepository.deleteById(sbProdNum);
    }

    @Override
    public List<SbProdMemberRecordDto> adminGetSbMemberRecord(String memberId, String scentNoteName) {
        List<SubscribeProduct> subscribeProducts = scentNoteName.equals("all") ? sbProductRepository.findAll() : sbProductRepository.findByScentNameScentNoteName(scentNoteName);

        return subscribeProducts.stream()
                .map(subscribeProduct -> SbProdMemberRecordDto.of(subscribeProduct, memberId))
                .collect(Collectors.toList());
    }
}
