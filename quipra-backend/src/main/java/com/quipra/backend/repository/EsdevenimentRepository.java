package com.quipra.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quipra.backend.model.Esdeveniment;

@Repository
public interface EsdevenimentRepository extends JpaRepository<Esdeveniment, Long> {
}