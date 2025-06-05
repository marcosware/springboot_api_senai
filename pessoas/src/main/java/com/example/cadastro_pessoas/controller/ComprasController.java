// Pacote onde está localizado o Controller
package com.example.cadastro_pessoas.controller;

// Importações necessárias
import java.util.List; // Para lidar com listas de objetos

import org.springframework.beans.factory.annotation.Autowired; // Injeção de dependência
import org.springframework.http.ResponseEntity; // Representa respostas HTTP
import org.springframework.web.bind.annotation.DeleteMapping; // Mapeia requisições DELETE
import org.springframework.web.bind.annotation.GetMapping; // Mapeia requisições GET
import org.springframework.web.bind.annotation.PathVariable; // Captura parâmetros da URL
import org.springframework.web.bind.annotation.PostMapping; // Mapeia requisições POST
import org.springframework.web.bind.annotation.RequestBody; // Indica que o corpo da requisição é o objeto
import org.springframework.web.bind.annotation.RequestMapping; // Mapeia o caminho base da API
import org.springframework.web.bind.annotation.RestController; // Indica que esta classe é um Controller REST

import com.example.cadastro_pessoas.model.ComprasModel;
import com.example.cadastro_pessoas.servicer.ComprasService;

// Anotação que define esta classe como um Controller REST
@RestController

// Caminho base para todas as requisições deste controller
@RequestMapping("/api/compras")
public class ComprasController {

    // Injeção de dependência do serviço que vai realizar a lógica de negócio
    @Autowired
    private ComprasService service;

    /**
     * Método GET para listar todas as Compras cadastradas.
     * URL: /api/Compras
     * Método HTTP: GET
     * Retorno: Lista de ComprasModel
     */
    @GetMapping
    public List<ComprasModel> listarTodos() {
        // Chama o método do service que retorna a lista de todas as Compras
        return service.listarTodos();
    }

    /**
     * Método GET para buscar uma pessoa específica pelo ID.
     * URL: /api/Compras/{id}
     * Método HTTP: GET
     * Parâmetro: ID da pessoa a ser buscada (capturado da URL)
     * Retorno: ResponseEntity com a Pessoa encontrada ou 404 (Not Found)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ComprasModel> buscarPorId(@PathVariable Long id) {
        // Busca a pessoa pelo ID, se encontrar, retorna 200 (OK), se não, retorna 404 (Not Found)
        return service.buscarPorId(id)
                     .map(ResponseEntity::ok) // Converte o resultado em ResponseEntity com status 200
                     .orElse(ResponseEntity.notFound().build()); // Retorna 404 se não encontrar
    }

    @GetMapping("/pessoa/{pessoaId}")
    public List<ComprasModel> buscaPorPessoa(@PathVariable Long pessoaId) {
        return service.buscarPorPessoa(pessoaId);
    }

    /**
     * Método POST para salvar uma nova pessoa.
     * URL: /api/Compras
     * Método HTTP: POST
     * Parâmetro: Objeto do tipo ComprasModel no corpo da requisição (JSON)
     * Retorno: Objeto salvo
     */
    @PostMapping
    public ComprasModel salvar(@RequestBody ComprasModel ComprasModel) {
        // Chama o método de salvar do service e retorna o objeto persistido
        return service.salvar(ComprasModel);
    }

    /**
     * Método DELETE para excluir uma pessoa do banco de dados.
     * URL: /api/Compras/{id}
     * Método HTTP: DELETE
     * Parâmetro: ID da pessoa a ser excluída
     * Retorno: ResponseEntity com status 204 (No Content) ou 404 (Not Found) se não encontrar
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        // Verifica se o ID existe no banco de dados
        if (!service.buscarPorId(id).isPresent()) {
            // Se não encontrar, retorna 404 (Not Found)
            return ResponseEntity.notFound().build();
        }
        // Se encontrar, chama o método para deletar
        service.deletar(id);
        // Retorna 204 (No Content), que significa que foi deletado com sucesso, mas sem conteúdo
        return ResponseEntity.noContent().build();
    }
}
