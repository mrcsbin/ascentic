package com.backend.product.dto.admindto;

import com.backend.product.entity.Product;
import com.backend.productoption.entity.ProductOption;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class AdminProdUpdateInfoDto {
    private Integer prodNum;
    private String prodName;
    private List<OptionDto> options;
    private String prodCategory;
    private String prodInfo;

    private AdminProdUpdateInfoDto(Integer prodNum, String prodName, String prodCategory, String prodInfo ) {
        this.prodNum = prodNum;
        this.prodName = prodName;
        this.prodCategory = prodCategory;
        this.prodInfo = prodInfo;
    }

    public static AdminProdUpdateInfoDto of(Product product) {
        AdminProdUpdateInfoDto adminProdUpdateInfoDto = new AdminProdUpdateInfoDto(product.getProdNum(),
                product.getProdName(), product.getProdCategory(), product.getProdInfo());
        adminProdUpdateInfoDto.setOptions(product.getProductOption());

        return adminProdUpdateInfoDto;
    }

    private void setOptions(List<ProductOption> productOptions) {
        options = productOptions.stream()
                .map(OptionDto::of)
                .collect(Collectors.toList());
    }

}
