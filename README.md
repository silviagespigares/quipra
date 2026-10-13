# Quipra - Espai de treball professional per autònoms


Quipra es una aplicación web full-stack desarrollada para optimizar la gestión operativa diaria de profesionales autónomos y freelancers. Centraliza la cartera de clientes, la agenda de eventos, el seguimiento de tareas y horas, y el control de movilidad y gastos de viaje bajo una interfaz ligera, intuitiva y adaptativa.

---

## Stack Tecnológico

### Backend
* **Lenguaje / Framework:** Java 17+ / Spring Boot 3
* **Persistencia de Datos:** Spring Data JPA / Hibernate
* **Base de Datos:** MySQL 8.x
* **Seguridad y Gestión de Errores:** Control de excepciones globales (`GlobalExceptionHandler`)
* **Testing:** JUnit 5 y Spring Boot Test
* **Gestor de Dependencias:** Maven

### Frontend
* **Framework / Empaquetador:** React 18+ / Vite
* **Lenguaje / Estilos:** JavaScript (ES6+), CSS3 (Diseño adaptativo / Responsive mediante Media Queries)
* **Peticiones HTTP:** Fetch API con control de fallos de red y servidor

---

## Arquitectura del Sistema

El proyecto se organiza bajo una arquitectura de dos capas desacopladas:

1. **`quipra-backend/`**: API RESTful encargada de la lógica de negocio, validación de datos, gestión de usuarios, tratamiento de incidencias y comunicación con MySQL.
2. **`quipra-frontend/`**: Single Page Application (SPA) en React que implementa la interfaz de usuario (Landing Page, Panel de Inicio, Calendario, Clientes y perfil de Usuario).

---

## Configuración de la Base de Datos (MySQL)

Crear la base de datos local en MySQL antes de iniciar el backend:

```sql
CREATE DATABASE IF NOT EXISTS quipra_db;