package com.backend.taste;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TasteResultDTO {
    private String firstPlace;
    private String secondPlace;
    private String thirdPlace;
}
