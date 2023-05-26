package com.backend.subscribeproduct.dto;

import com.backend.scent.entity.Scent;
import com.backend.subscribeproduct.entity.SubscribeProduct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SbProductDTO {
    private Integer sbProdNum;

    private Scent scentName;

    private String sbProdPrice;

    private String sbProdIntro;

    private String sbProdImage;

    public static SbProductDTO of(SubscribeProduct subscribeProduct){
        return new SbProductDTO(subscribeProduct.getSbProdNum(), subscribeProduct.getScentName(),
                subscribeProduct.getSbProdPrice(), subscribeProduct.getSbProdIntro(), subscribeProduct.getSbProdImage());
    }
}
