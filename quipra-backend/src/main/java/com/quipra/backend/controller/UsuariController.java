package com.quipra.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quipra.backend.model.Usuari;
import com.quipra.backend.repository.UsuariRepository;

@RestController
@RequestMapping("/api/usuaris")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuariController {

    @Autowired
    private UsuariRepository usuariRepository;

    @GetMapping
    public List<Usuari> getAllUsuaris() {
        return usuariRepository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuari usuari) {
        // Verificar si l'email ja existeix
        Optional<Usuari> existent = usuariRepository.findByEmail(usuari.getEmail());
        if (existent.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aquest correu electrònic ja està registrat.");
        }

        if (usuari.getRol() == null || usuari.getRol().isEmpty()) {
            usuari.setRol("USUARI");
        }
        
        Usuari nouUsuari = usuariRepository.save(usuari);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouUsuari);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuari loginData) {
        Optional<Usuari> usuariOpt = usuariRepository.findByEmail(loginData.getEmail());

        if (usuariOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuari no trobat.");
        }

        Usuari usuari = usuariOpt.get();

        // Validació de contrasenya
        if (!usuari.getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contrasenya incorrecta.");
        }

        return ResponseEntity.ok(usuari);
    }
}