package com.api.alunos.repository;

import org.springframework.stereotype.Repository;

import com.api.alunos.model.AlunoModel;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AlunoRepository extends JpaRepository<AlunoModel, Long> {
}
