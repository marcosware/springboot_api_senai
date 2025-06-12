package spring.viaCep.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import spring.viaCep.models.*;
import spring.viaCep.services.*;


@RestController

@RequestMapping("/cargos")
public class CargoController {

    @Autowired
    private CargoService service;

    @GetMapping
    public List<CargoModel> listAll() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CargoModel> searchById(@PathVariable Long id) {
        return service.searchById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CargoModel register(@RequestBody CargoModel CargoModel) {
        return service.register(CargoModel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CargoModel> update(@PathVariable Long id, @RequestBody CargoModel CargoModel) {
        if(!service.searchById(id).isPresent()) return ResponseEntity.notFound().build();
        CargoModel.setId(id);
        return ResponseEntity.ok(service.register(CargoModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if(!service.searchById(id).isPresent()) return ResponseEntity.notFound().build();
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}