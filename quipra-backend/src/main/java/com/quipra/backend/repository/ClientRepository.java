package com.quipra.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quipra.backend.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
}