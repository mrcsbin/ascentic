package com.backend.subscribeSend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubsSendInsertDTO {
    private Integer sbMemberNum;
    private Integer spNum;
}
