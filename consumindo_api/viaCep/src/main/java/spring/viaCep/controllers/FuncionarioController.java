package spring.viaCep.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import spring.viaCep.models.*;
import spring.viaCep.services.*;


@RestController

@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService service;

    @GetMapping
    public List<FuncionarioModel> listAll() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioModel> searchById(@PathVariable Long id) {
        return service.searchById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public FuncionarioModel register(@RequestBody FuncionarioModel FuncionarioModel) {
        return service.register(FuncionarioModel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FuncionarioModel> update(@PathVariable Long id, @RequestBody FuncionarioModel FuncionarioModel) {
        if(!service.searchById(id).isPresent()) return ResponseEntity.notFound().build();
        FuncionarioModel.setId(id);
        return ResponseEntity.ok(service.register(FuncionarioModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if(!service.searchById(id).isPresent()) return ResponseEntity.notFound().build();
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}