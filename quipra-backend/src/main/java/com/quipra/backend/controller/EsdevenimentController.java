package com.quipra.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quipra.backend.model.Esdeveniment;
import com.quipra.backend.repository.EsdevenimentRepository;

@RestController
@RequestMapping("/api/esdeveniments")
@CrossOrigin(origins = "http://localhost:5173")
public class EsdevenimentController {

    @Autowired
    private EsdevenimentRepository esdevenimentRepository;

    @GetMapping
    public List<Esdeveniment> getAllEsdeveniments() {
        return esdevenimentRepository.findAll();
    }

    @PostMapping
    public Esdeveniment createEsdeveniment(@RequestBody Esdeveniment esdeveniment) {
        return esdevenimentRepository.save(esdeveniment);
    }
}