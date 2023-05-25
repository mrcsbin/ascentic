package com.backend.cart.dto;

import lombok.*;

@Getter
public class AddCartDto {
    private int prodCount;
    private String optionName;
    private Integer optionNum;
}
