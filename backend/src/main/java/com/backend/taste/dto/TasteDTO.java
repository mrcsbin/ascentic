package com.backend.taste.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TasteDTO {
    private Boolean tasteAgree;
    private String tasteGender;
    private Integer tasteAge;
    private Integer tasteTest1;
    private Integer tasteTest2;
    private Integer tasteTest3;
    private Integer tasteTest4;
    private Integer tasteTest5;
}

