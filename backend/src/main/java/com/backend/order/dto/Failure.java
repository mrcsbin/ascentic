package com.backend.order.dto;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Failure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer failureId;

    @Column
    private String code;
    @Column
    private String message;
}