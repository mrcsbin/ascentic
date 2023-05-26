package com.backend.subscribeproduct.dto;

import com.backend.scent.entity.Scent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SbProductReqDTO {
    private String scentName;

    private String sbProdPrice;

    private String sbProdIntro;

    private String sbProdImage;
}
