package com.backend.subscribesend.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
public class AdminSbSendUpdateDto {
    private Integer sbSendNum;
    private String sbSendPostcode;
    private String sbSendState;
    private Integer sbProdNum;
    private String sbShippingCode;
}
