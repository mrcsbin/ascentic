package com.backend.product.dto.admindto;

import com.backend.product.entity.Product;
import com.backend.productoption.entity.ProductOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class OptionDto {
    private Integer optionNum;
    private String prodOption;
    private Integer prodPrice;
    private Integer prodStock;

    public static OptionDto of(ProductOption productOption) {
        return new OptionDto(productOption.getOptionNum(),
                productOption.getProdOption(),
                productOption.getProdPrice(),
                productOption.getProdStock());
    }
}
