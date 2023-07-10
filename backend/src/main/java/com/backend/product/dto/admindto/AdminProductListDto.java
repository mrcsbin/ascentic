package com.backend.product.dto.admindto;

import com.backend.product.entity.Product;
import com.backend.productoption.entity.ProductOption;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class AdminProductListDto {
    @Setter
    private Integer prodNum; // 상품 번호

    @Setter
    private String prodName; // 상품 이름
    
    @Setter
    private  String scentName; // 향 이름

    @Setter
    private Integer prodWishCount; // 찜 수

    @Setter
    private Integer prodReadCount; // 조회수

    @Setter
    private String prodCategory; // 카테고리

    @Setter
    private LocalDate prodDate; // 등록 날짜

    @Setter
    private String prodState; // 상품 상태

    private Integer prodStock; // 재고

    private String prodImage; // 이미지

    private Integer prodPrice; // 가격

    private List<String> options; // 옵션명


    public static AdminProductListDto of(Product product) {
        AdminProductListDto dto = new AdminProductListDto();
        dto.setProdNum(product.getProdNum());
        dto.setProdName(product.getProdName());
        dto.setScentName(product.getScent().getScentName());
        dto.setProdStock(product);
        dto.setProdWishCount(product.getWishCount(product.getProdNum()));
        dto.setProdReadCount(product.getProdReadCount());
        dto.setProdCategory(product.getProdCategory());
        dto.setProdImage(product);
        dto.setProdPrice(product);
        dto.setOptions(product);
        dto.setProdState(product.getProdState());
        dto.setProdDate(product.getProdDate().toLocalDate());
        return dto;
    }

    private void setOptions(Product product) {
        options = product.getProductOption().stream()
                .map(ProductOption::getProdOption)
                .collect(Collectors.toList());
    }

    private void setProdImage(Product product) {
        prodImage = product.getProductImages().get(0).getProdSaveName();
    }

    private void setProdStock(Product product) {
        prodStock = product.getProductOption().get(0).getProdStock();
    }

    private void setProdPrice(Product product) {
        prodPrice = product.getProductOption().get(0).getProdPrice();
    }


}
