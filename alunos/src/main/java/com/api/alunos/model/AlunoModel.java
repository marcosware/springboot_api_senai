package com.api.alunos.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity

@Table(name = "alunos")

@Getter
@Setter

@NoArgsConstructor
public class AlunoModel {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column
    private String email;
}
