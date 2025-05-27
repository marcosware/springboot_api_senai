package com.api.alunos.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.api.alunos.model.AlunoModel;
import com.api.alunos.repository.AlunoRepository;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AlunoService {
    
    @Autowired
    private AlunoRepository repository;

    public List<AlunoModel> listAll() {
        return repository.findAll();
    }

    public Optional<AlunoModel> searchById(Long id) {
        return repository.findById(id);
    }

    public AlunoModel register(AlunoModel alunoModel) {
        return repository.save(alunoModel);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
