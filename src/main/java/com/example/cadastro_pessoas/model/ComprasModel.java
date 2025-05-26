// Pacote onde a classe está localizada
package com.example.cadastro_pessoas.model;

import java.time.*;

import org.hibernate.annotations.CreationTimestamp;

// Importações necessárias para o mapeamento JPA e Lombok
import jakarta.persistence.Column;           // Define colunas no banco de dados
import jakarta.persistence.Entity;           // Define esta classe como uma entidade JPA
import jakarta.persistence.GeneratedValue;   // Define geração automática de IDs
import jakarta.persistence.GenerationType;   // Define a estratégia de geração de IDs
import jakarta.persistence.Id;               // Define o identificador (Primary Key) da entidade
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;            // Define o nome da tabela no banco de dados
import lombok.Getter;                        // Lombok - Gera os métodos GET automaticamente
import lombok.NoArgsConstructor;             // Lombok - Gera um construtor sem argumentos
import lombok.Setter;                        // Lombok - Gera os métodos SET automaticamente

// Anotação para informar que esta classe representa uma entidade do banco de dados
@Entity

// Anotação para definir o nome da tabela que será criada no banco
@Table(name = "compras") // Aqui você pode mudar para o nome desejado, por exemplo, "pessoas"

// Lombok - Gera automaticamente os métodos getters e setters
@Getter
@Setter

// Lombok - Gera um construtor sem argumentos
@NoArgsConstructor
public class ComprasModel {

    /**
     * Anotação que define o campo 'id' como a chave primária (Primary Key) da tabela.
     * A estratégia de geração é IDENTITY, que significa que o valor é gerado pelo banco de dados.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDate data_compra;

    @Column(nullable = false, name = "pessoa_id")
    private Long pessoaId;

    @PrePersist
    public void prePersist() {
        this.data_compra = java.time.LocalDate.now();
    }
}
