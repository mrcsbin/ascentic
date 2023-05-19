package com.backend.subscribeProduct.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SbProductDTO {
    private String scentName;

    private String sbProdPrice;

    private String sbProdIntro;
}
