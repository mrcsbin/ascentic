package com.backend.scent;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
@Table(name = "tb_scent")
public class Scent {

    @Id
    @Column(name = "scent_name")
    private String scentName;

    @Column(name = "scent_note_name", nullable = false)
    private String scentNoteName;

    @Column(name = "scent_content")
    private String scentContent;

}
