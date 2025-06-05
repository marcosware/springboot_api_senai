// Pacote onde a classe está localizada
package com.example.cadastro_pessoas.servicer;

// Importações necessárias para manipulação de listas e objetos opcionais
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;  // Injeção de dependência
import org.springframework.stereotype.Service;               // Define a classe como um Service do Spring

import com.example.cadastro_pessoas.model.ComprasModel;
import com.example.cadastro_pessoas.repository.ComprasRepository;

/**
 * Anotação @Service indica que esta classe é um componente do Spring,
 * responsável por conter a lógica de negócio da aplicação.
 */
@Service
public class ComprasService {

    /**
     * Injeção de dependência do repositório.
     * O Spring automaticamente instancia o objeto e gerencia o ciclo de vida dele.
     */
    @Autowired
    private ComprasRepository repository;

    /**
     * Método responsável por listar todas as Compras cadastradas.
     * @return Lista com todas as Compras do banco de dados.
     */
    public List<ComprasModel> listarTodos() {
        // Chama o método findAll() do repository para buscar todas as Compras
        return repository.findAll();
    }

    /**
     * Método responsável por buscar uma pessoa específica pelo ID.
     * @param id Identificador da pessoa.
     * @return Um Optional contendo a pessoa encontrada, ou vazio se não encontrar.
     */
    public Optional<ComprasModel> buscarPorId(Long id) {
        // Chama o método findById() do repository para buscar a pessoa pelo ID
        return repository.findById(id);
    }

    public List<ComprasModel> buscarPorPessoa(Long pessoaId) {
        return repository.findByPessoaId(pessoaId);
    }

    /**
     * Método responsável por salvar ou atualizar uma pessoa no banco de dados.
     * @param ComprasModal Objeto da entidade ComprasModel contendo os dados.
     * @return A entidade salva ou atualizada.
     */
    public ComprasModel salvar(ComprasModel ComprasModal) {
        // Chama o método save() do repository para salvar os dados no banco
        return repository.save(ComprasModal);
    }

    /**
     * Método responsável por deletar uma pessoa do banco de dados.
     * @param id Identificador da pessoa a ser deletada.
     */
    public void deletar(Long id) {
        // Chama o método deleteById() do repository para remover o registro
        repository.deleteById(id);
    }
}
