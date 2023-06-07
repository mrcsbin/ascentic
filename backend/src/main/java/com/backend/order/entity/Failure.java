package com.backend.order.entity;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor


@Table(name = "tb_failure")
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