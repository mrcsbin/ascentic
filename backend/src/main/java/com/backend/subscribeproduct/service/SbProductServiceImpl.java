package com.backend.subscribeproduct.service;


import com.backend.scent.repository.ScentRepository;
import com.backend.subscribeproduct.repository.SbProductRepository;
import com.backend.subscribeproduct.dto.SbProductDTO;
import com.backend.subscribeproduct.entity.SubscribeProduct;
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
