package com.backend.subscribeSend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubsReviewDTO {
    private Integer sbSendNum;
    private Integer sbSendScore;
    private String sbSendReview;
}
