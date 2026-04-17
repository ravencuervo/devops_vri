# VRI Portal

Portal institucional del Vicerrectorado de Investigación — desarrollado con Strapi (backend) y React + Vite (frontend), orquestado con Docker.

---

## 📁 Estructura del proyecto

```
vri-portal/
├── backend/                  # Strapi CMS
│   ├── Dockerfile            # Imagen Docker del backend
│   ├── docker-compose.yml    # Levanta backend + MySQL de forma independiente
│   ├── .env.example          # Variables de entorno requeridas
│   └── src/
├── frontend/                 # React + Vite
│   ├── Dockerfile            # Imagen Docker del frontend
│   ├── docker-compose.yml    # Levanta el frontend de forma independiente
│   ├── .env.example          # Variables de entorno requeridas
│   └── src/
├── docker-compose.yml        # Orquestación completa (todos los servicios)
└── .env                      # Variables de entorno raíz (requerido)
```

---

## 🚀 Inicio rápido

### Opción A — Levantar todo junto (recomendado)

Desde la **raíz del proyecto**:

```bash
# 1. Copiar y configurar variables de entorno
cp .env.example .env   # (editar los valores si es necesario)

# 2. Construir e iniciar todos los servicios
docker compose up --build

# 3. Detener y eliminar contenedores
docker compose down
```

Servicios disponibles:

| Servicio   | URL                       |
|------------|---------------------------|
| Frontend   | http://localhost:5173     |
| Strapi API | http://localhost:1337     |
| Admin Panel| http://localhost:1337/admin|
| MySQL      | localhost:3306            |

---

### Opción B — Levantar cada servicio por separado

**Backend (Strapi + MySQL):**

```bash
cd backend

# Copiar y ajustar variables
cp .env.example .env

# Levantar
docker compose up --build

# Detener
docker compose down
```

**Frontend (React + Vite):**

```bash
cd frontend

# Copiar y ajustar variables
cp .env.example .env

# Levantar
docker compose up --build

# Detener
docker compose down
```

---

## ⚙️ Variables de entorno

### Raíz (`.env`)

| Variable              | Descripción                              | Default       |
|-----------------------|------------------------------------------|---------------|
| `DATABASE_CLIENT`     | Tipo de BD (`mysql`)                     | `mysql`       |
| `DATABASE_NAME`       | Nombre de la base de datos               | `strapi`      |
| `DATABASE_USERNAME`   | Usuario MySQL                            | `strapi`      |
| `DATABASE_PASSWORD`   | Contraseña MySQL                         | `strapi`      |
| `DATABASE_PORT`       | Puerto MySQL                             | `3306`        |
| `APP_KEYS`            | Claves de la app Strapi (separadas por `,`) | —           |
| `JWT_SECRET`          | Secreto JWT del API                      | —             |
| `ADMIN_JWT_SECRET`    | Secreto JWT del panel Admin              | —             |
| `API_TOKEN_SALT`      | Salt para tokens de API                  | —             |
| `TRANSFER_TOKEN_SALT` | Salt para tokens de transferencia        | —             |
| `VITE_API_URL`        | URL del backend consumida por el frontend| `http://localhost:1337` |

> ⚠️ **Nunca** subas el archivo `.env` al repositorio. Ya está en `.gitignore`.

---

## 🐳 Comandos Docker útiles

```bash
# Ver logs de un servicio
docker compose logs -f strapi
docker compose logs -f frontend

# Reconstruir solo un servicio
docker compose up --build strapi
docker compose up --build frontend

# Eliminar contenedores + volúmenes (reset completo)
docker compose down -v

# Ver contenedores activos
docker ps
```

---

## 🛠️ Desarrollo local sin Docker

### Backend

```bash
cd backend
npm install
npm run develop
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
