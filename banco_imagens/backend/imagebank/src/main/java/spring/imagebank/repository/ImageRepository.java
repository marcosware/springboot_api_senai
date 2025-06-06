package spring.imagebank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import spring.imagebank.model.ImageModel;

@Repository
public interface ImageRepository extends JpaRepository<ImageModel, Long> {
}
