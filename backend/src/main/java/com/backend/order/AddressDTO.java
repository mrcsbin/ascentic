package com.backend.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressDTO {
    private String memberId;
    private String shipMainAddress;
    private String shipSubAddress;
}
