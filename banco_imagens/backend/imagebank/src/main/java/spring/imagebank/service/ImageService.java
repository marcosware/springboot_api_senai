package spring.imagebank.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import spring.imagebank.model.ImageModel;
import spring.imagebank.repository.ImageRepository;

@Service
public class ImageService {

    @Autowired
    private ImageRepository repository;

    public List<ImageModel> listarTodos() {
        return repository.findAll();
    }

    public Optional<ImageModel> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public ImageModel salvar(ImageModel ImageModal) {
        return repository.save(ImageModal);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
