# 💬 Real-Time Distributed Chat

![Status](https://img.shields.io/badge/status-active-success)
![Node.js](https://img.shields.io/badge/Node.js-backend-green)
![React](https://img.shields.io/badge/React-frontend-blue)
![Socket.io](https://img.shields.io/badge/Socket.io-real--time-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-blue)

Sistema de chat distribuido en tiempo real desarrollado bajo una arquitectura cliente-servidor, permitiendo la comunicación instantánea entre usuarios mediante WebSockets.

El proyecto implementa una separación completa entre frontend y backend, utilizando tecnologías modernas para garantizar escalabilidad, persistencia de datos y comunicación eficiente entre los diferentes componentes del sistema.

---

# 📌 Descripción del proyecto

Es una aplicación web que permite a múltiples usuarios comunicarse mediante mensajes instantáneos utilizando conexiones persistentes con WebSockets.

El sistema combina una API REST para la gestión de usuarios y datos, junto con Socket.io para la transmisión de mensajes en tiempo real.

La arquitectura distribuida permite separar las responsabilidades principales:

- **Frontend:** encargado de la interfaz gráfica y la interacción del usuario.
- **Backend:** encargado de la lógica del sistema, autenticación, API y comunicación mediante sockets.
- **Base de datos:** encargada del almacenamiento y persistencia de usuarios y mensajes.

---

# ✨ Características principales

## Comunicación en tiempo real

- Mensajería instantánea mediante WebSockets.
- Actualización automática de conversaciones.
- Comunicación entre múltiples usuarios conectados.

## Gestión de usuarios

- Registro de usuarios.
- Inicio de sesión.
- Identificación de usuarios conectados.
- Asociación de mensajes con usuarios.

## Gestión de información

- Almacenamiento permanente de mensajes.
- Consulta del historial de conversaciones.
- Manejo de datos mediante ORM.
- Integridad de información mediante relaciones.

## Arquitectura

- Separación frontend/backend.
- Implementación de API REST.
- Comunicación basada en eventos.
- Configuración mediante variables de entorno.

---

# 🏗️ Arquitectura del sistema
                CLIENTES
                   |
                   |
             React Frontend
                   |
      -----------------------------
      |                           |
   REST API                  WebSocket
      |                           |
      -----------------------------
                   |
             Node.js Backend
                   |
              Prisma ORM
                   |
             PostgreSQL DB

             
---

# 🛠️ Tecnologías utilizadas

## Frontend

| Tecnología | Descripción |
|------------|-------------|
| React.js | Desarrollo de interfaz de usuario |
| Socket.io Client | Comunicación en tiempo real |
| Axios | Consumo de servicios API |
| JavaScript | Lenguaje de programación |
| CSS | Diseño de interfaz |

## Backend

| Tecnología | Descripción |
|------------|-------------|
| Node.js | Entorno de ejecución |
| Express.js | Framework para servidor |
| Socket.io | Implementación de WebSockets |
| Prisma ORM | Gestión de base de datos |
| PostgreSQL | Sistema gestor de base de datos |

## Herramientas

| Herramienta | Uso |
|-------------|-----|
| Git | Control de versiones |
| GitHub | Repositorio del proyecto |
| Visual Studio Code | Entorno de desarrollo |
| Postman | Pruebas de API |

---


---

# 🚀 Instalación y ejecución

## Requisitos previos

Antes de ejecutar el proyecto se necesita:

- Node.js versión 18 o superior.
- PostgreSQL instalado.
- Git instalado.

---

# 📥 Clonar repositorio

```bash
git clone https://github.com/usuario/real-time-chat.git

cd real-time-chat
