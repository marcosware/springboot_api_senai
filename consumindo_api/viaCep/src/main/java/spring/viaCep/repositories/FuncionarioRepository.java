package spring.viaCep.repositories;

import org.springframework.stereotype.Repository;

import spring.viaCep.models.*;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface FuncionarioRepository extends JpaRepository<FuncionarioModel, Long> {
}
