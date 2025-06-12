package spring.viaCep.services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import spring.viaCep.models.*;
import spring.viaCep.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class CargoService {
    
    @Autowired
    private CargoRepository repository;

    public List<CargoModel> listAll() {
        return repository.findAll();
    }

    public Optional<CargoModel> searchById(Long id) {
        return repository.findById(id);
    }

    public CargoModel register(CargoModel CargoModel) {
        return repository.save(CargoModel);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
