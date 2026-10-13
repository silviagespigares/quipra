package com.quipra.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quipra.backend.model.Usuari;

@Repository
public interface UsuariRepository extends JpaRepository<Usuari, Long> {
    Optional<Usuari> findByEmail(String email);
}