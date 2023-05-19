package com.backend.subscribeProduct.service;


import com.backend.scent.repository.ScentRepository;
import com.backend.subscribeProduct.repository.SbProductRepository;
import com.backend.subscribeProduct.dto.SbProductDTO;
import com.backend.subscribeProduct.entity.SubscribeProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SbProductServiceImpl implements SbProductService{

    private final SbProductRepository sbProductRepository;
    private final ScentRepository scentRepository;
    @Override
    public void addSbProduct(SbProductDTO sbProductDTO) {
        SubscribeProduct subscribeProduct = SubscribeProduct.builder()
                .scentName(scentRepository.findById(sbProductDTO.getScentName()).orElse(null))
                .sbProdPrice(sbProductDTO.getSbProdPrice())
                .sbProdIntro(sbProductDTO.getSbProdIntro())
                .build();

        sbProductRepository.save(subscribeProduct);
    }
}
