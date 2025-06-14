package spring.viaCep.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity

@Table(name = "funcionarios")

@Getter
@Setter

@NoArgsConstructor
public class FuncionarioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "funcionarios_generator")
    @SequenceGenerator(
        name = "funcionarios_generator",
        sequenceName = "funcionarios_seq",
        allocationSize = 1,
        initialValue = 1)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private String cep;
    
    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private String numero;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String estado;
}
