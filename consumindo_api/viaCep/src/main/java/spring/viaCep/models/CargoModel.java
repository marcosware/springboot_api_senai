package spring.viaCep.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity

@Table(name = "cargos")

@Getter
@Setter

@NoArgsConstructor
public class CargoModel {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column
    private String descricao;
}
