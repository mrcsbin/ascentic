package com.backend.scent.dto;

import com.backend.scent.entity.Scent;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScentDTO {
    private String scentName;
    private String scentNoteName;
    private String scentContent;

    public static ScentDTO of(Scent scent){
        return new ScentDTO(scent.getScentName(), scent.getScentNoteName(), scent.getScentContent());
    }
}
