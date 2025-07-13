package com.lojamateriais.apirestful.repository;

import com.lojamateriais.apirestful.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
