package com.backend.product.dto.admindto;

import com.backend.product.entity.Product;
import com.backend.productoption.entity.ProductOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminProdUpdateInfoDto {
    private Integer prodNum;
    private String prodName;
    private String scentName;
    private List<OptionDto> options;
    private String prodCategory;
    private String prodInfo;
//    private String prodState;

    // 상품 업데이트 request/response 전부 사용 중

    private AdminProdUpdateInfoDto(Integer prodNum, String prodName, String scentName, String prodCategory, String prodInfo) {
        this.prodNum = prodNum;
        this.prodName = prodName;
        this.scentName = scentName;
        this.prodCategory = prodCategory;
        this.prodInfo = prodInfo;
//        this.prodState = prodState;
    }

    public static AdminProdUpdateInfoDto of(Product product) {
        AdminProdUpdateInfoDto adminProdUpdateInfoDto = new AdminProdUpdateInfoDto(product.getProdNum(),
                product.getProdName(),
                product.getScent().getScentName(),
                product.getProdCategory(),
                product.getProdInfo());
//                product.getProdState());
        adminProdUpdateInfoDto.setOptions(product.getProductOption());

        return adminProdUpdateInfoDto;
    }

    private void setOptions(List<ProductOption> productOptions) {
        options = productOptions.stream()
                .map(OptionDto::of)
                .collect(Collectors.toList());
    }

//    public List<Integer> getOptionNums() {
//        return options.stream()
//                .map(OptionDto::getOptionNum)
//                .collect(Collectors.toList());
//    }
}
