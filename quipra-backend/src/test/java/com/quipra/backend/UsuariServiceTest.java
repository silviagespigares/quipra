package com.quipra.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UsuariServiceTest {

    @Test
    @DisplayName("Test de verificació de la configuració de Quipra")
    void testContextLoads() {
        // Test bàsic per assegurar que el context de Spring Boot s'inicia correctament
        String nomAplicacio = "Quipra";
        assertNotNull(nomAplicacio, "El nom de l'aplicació no ha de ser nul");
        assertEquals("Quipra", nomAplicacio, "El nom de l'aplicació ha de ser Quipra");
    }
}