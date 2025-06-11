package spring.viaCep.services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import spring.viaCep.models.*;
import spring.viaCep.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class FuncionarioService {
    
    @Autowired
    private FuncionarioRepository repository;

    public List<FuncionarioModel> listAll() {
        return repository.findAll();
    }

    public Optional<FuncionarioModel> searchById(Long id) {
        return repository.findById(id);
    }

    public FuncionarioModel register(FuncionarioModel funcionarioModel) {
        return repository.save(funcionarioModel);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
