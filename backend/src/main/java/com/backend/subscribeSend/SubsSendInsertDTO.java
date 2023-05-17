package com.backend.subscribeSend;

import com.backend.scent.Scent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubsSendInsertDTO {
    private Integer sbMemberNum;
    private Integer spNum;
}
