# Music API

API REST para gestionar canciones y géneros musicales, construida con **NestJS** y documentada con **Swagger**.

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (incluido con Node.js)

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd music-api

# Instalar dependencias
npm install
```

`npm install` instala también las dependencias ya definidas en `package.json`, incluyendo:

- `@nestjs/swagger` para la documentación de endpoints
- `class-validator` y `class-transformer` para validación de DTOs

## Ejecución

```bash
# Modo desarrollo (con hot-reload)
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

El servidor se levanta en `http://localhost:3000` por defecto.

## Documentación Swagger

Una vez iniciado el servidor, acceder a:

```
http://localhost:3000/api/docs
```

Ahí se pueden probar todos los endpoints directamente desde el navegador.

## Estructura del proyecto

```
src/
├── data.ts                    # Datos iniciales (seed) de géneros y canciones
├── main.ts                    # Punto de entrada, configuración de Swagger y CORS
├── app.module.ts              # Módulo raíz
├── genres/                    # Módulo de géneros musicales
│   ├── genre.entity.ts        # Entidad Genre
│   ├── dto/
│   │   ├── create-genre.dto.ts
│   │   └── update-genre.dto.ts
│   ├── genres.repository.ts   # Repositorio (CRUD en memoria)
│   ├── genres.service.ts      # Lógica de negocio
│   ├── genres.controller.ts   # Endpoints HTTP
│   └── genres.module.ts
└── songs/                     # Módulo de canciones
    ├── song.entity.ts         # Entidad Song
    ├── dto/
    │   ├── create-song.dto.ts
    │   └── update-song.dto.ts
    ├── songs.repository.ts    # Repositorio (CRUD en memoria)
    ├── songs.service.ts       # Lógica de negocio
    ├── songs.controller.ts    # Endpoints HTTP
    └── songs.module.ts
```

## Endpoints disponibles

### Géneros (`/genres`)

| Método | Ruta          | Descripción                     |
| ------ | ------------- | ------------------------------- |
| GET    | `/genres`     | Obtener todos los géneros       |
| GET    | `/genres/:id` | Obtener un género por ID        |
| POST   | `/genres`     | Crear un nuevo género           |
| PUT    | `/genres/:id` | Actualizar un género existente  |
| DELETE | `/genres/:id` | Eliminar un género              |

### Canciones (`/songs`)

| Método | Ruta                     | Descripción                          |
| ------ | ------------------------ | ------------------------------------ |
| GET    | `/songs`                 | Obtener todas las canciones          |
| GET    | `/songs?genreId=1`       | Filtrar canciones por género         |
| GET    | `/songs/:id`             | Obtener una canción por ID           |
| POST   | `/songs`                 | Crear una nueva canción              |
| PUT    | `/songs/:id`             | Actualizar una canción existente     |
| DELETE | `/songs/:id`             | Eliminar una canción                 |

## Tecnologías

- **NestJS** — Framework backend para Node.js
- **TypeScript** — Lenguaje tipado
- **Swagger** (`@nestjs/swagger`) — Documentación interactiva de la API
- **class-validator / class-transformer** — Validación de DTOs
- **Vite** — Bundler rápido para el frontend
- **TailwindCSS** — Framework de utilidades CSS
- **TypeScript vanilla modular** — Frontend sin frameworks, con módulos ES

---

## Frontend

Aplicación web construida con **Vite + TypeScript vanilla + TailwindCSS** que consume todos los endpoints de la API.

### Instalación del frontend

```bash
cd frontend
npm install
```

`npm install` instala también las dependencias ya definidas, incluyendo:

- `tailwindcss` y `@tailwindcss/vite` para estilos con TailwindCSS

### Ejecución del frontend

```bash
# Dentro de la carpeta frontend/
npm run dev
```

El frontend se levanta en `http://localhost:5173` por defecto.

> **Importante:** El backend (NestJS) debe estar corriendo en `http://localhost:3000` para que el frontend pueda consumir la API.

### Estructura del frontend

```
frontend/
├── index.html
├── vite.config.ts             # Configuración de Vite con plugin TailwindCSS
├── package.json
├── tsconfig.json
└── src/
    ├── style.css              # Importación de TailwindCSS
    ├── main.ts                # Punto de entrada, layout y navegación
    ├── api.ts                 # Módulo de consumo de la API (fetch)
    ├── genres.ts              # Módulo UI para CRUD de géneros
    └── songs.ts               # Módulo UI para CRUD de canciones
```

### Funcionalidades del frontend

- Navegación entre vistas de Géneros y Canciones
- Crear, editar y eliminar géneros musicales
- Crear, editar y eliminar canciones
- Filtrar canciones por género
- Validación de formularios
- Consumo de todos los endpoints expuestos por la API
