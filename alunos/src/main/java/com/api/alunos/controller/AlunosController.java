package com.api.crud.controller;

import java.util.List;
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.api.crud.model.AlunoModel;
import com.api.crud.service.AlunoService;


@RestController

@RequestMapping("/api/alunos")
public class AlunosController {

    @Autowired
    private AlunoService service;

    @GetMapping
    public List<AlunoModel> listAll() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoModel> searchById(@PathVariable Long id) {
        return service.searchById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public AlunoModel register(@RequestBody AlunoModel alunoModel) {
        return service.register(alunoModel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoModel> update(@PathVariable Long id, @RequestBody AlunoModel alunoModel) {
        if(!service.searchById(id).isPresent()) return ResponseEntity.notFound().build();
        alunoModel.setId(id);
        return ResponseEntity.ok(service.register(alunoModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if(!service.searchById(id).isPresent()) return ResponseEntity.notFound().build();
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}