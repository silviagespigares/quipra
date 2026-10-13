package com.quipra.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "esdeveniments")
public class Esdeveniment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titol;

    @Column(nullable = false)
    private LocalDate data;

    private String descripcio;

    public Esdeveniment() {}

    public Esdeveniment(String titol, LocalDate data, String descripcio) {
        this.titol = titol;
        this.data = data;
        this.descripcio = descripcio;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitol() { return titol; }
    public void setTitol(String titol) { this.titol = titol; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public String getDescripcio() { return descripcio; }
    public void setDescripcio(String descripcio) { this.descripcio = descripcio; }
}