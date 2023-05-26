package com.backend.subscribeproduct.service;


import com.backend.scent.repository.ScentRepository;
import com.backend.subscribeproduct.dto.SbProductReqDTO;
import com.backend.subscribeproduct.repository.SbProductRepository;
import com.backend.subscribeproduct.dto.SbProductDTO;
import com.backend.subscribeproduct.entity.SubscribeProduct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SbProductServiceImpl implements SbProductService{

    private final SbProductRepository sbProductRepository;
    private final ScentRepository scentRepository;
    @Override
    public void addSbProduct(SbProductReqDTO sbProductReqDTO) {
        SubscribeProduct subscribeProduct = SubscribeProduct.builder()
                .scentName(scentRepository.findById(sbProductReqDTO.getScentName()).orElse(null))
                .sbProdPrice(sbProductReqDTO.getSbProdPrice())
                .sbProdIntro(sbProductReqDTO.getSbProdIntro())
                .sbProdImage(sbProductReqDTO.getSbProdImage())
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
    public void updateSbProduct(Integer sbProdNum, SbProductReqDTO sbProductReqDTO){
        SubscribeProduct sbProduct = sbProductRepository.findById(sbProdNum).orElse(null);
        sbProduct.updateSbProduct(
                scentRepository.findById(sbProductReqDTO.getScentName()).orElse(null),
                sbProductReqDTO.getSbProdPrice(), sbProductReqDTO.getSbProdIntro(),
                sbProductReqDTO.getSbProdImage());
    }

    @Override
    public void deleteSbProduct(Integer sbProdNum){
        sbProductRepository.deleteById(sbProdNum);
    }
}
