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

    private Integer sbProdPrice;

    private String sbProdIntro;

    private String sbProdImage;

    private Integer sbProdStock;

    public static SbProductDTO of(SubscribeProduct subscribeProduct){
        return new SbProductDTO(subscribeProduct.getSbProdNum(), subscribeProduct.getScentName(),
                subscribeProduct.getSbProdPrice(), subscribeProduct.getSbProdIntro(), subscribeProduct.getSbProdImage(),
                subscribeProduct.getSbProdStock());
    }
}
