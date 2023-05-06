package com.backend.order;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressDTO {
    private String memberId;
    private String shipMainAddress;
    private String shipSubAddress;
}
