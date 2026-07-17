# FastCure Backend

Production-ready backend API service for the FastCure Smart Healthcare System, engineered using Node.js, Express.js, TypeScript, and MongoDB.

Features a layered architecture (Controller-Service-Repository patterns), strict TypeScript compiling, Zod request body validation, Helmet-enhanced HTTP security, cookie-based session management, winston logging, Swagger docs, and containerized deployment assets.

---

## Technical Stack

- **Runtime**: Node.js (v20+)
- **Language**: TypeScript (strict mode enabled)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Helmet, CORS, bcryptjs, jsonwebtoken (JWT)
- **Validation**: Zod (strict schema definitions)
- **API Documentation**: Swagger UI & OpenAPI 3.0 specifications
- **DevOps**: Docker, Render Blueprint configuration (`render.yaml`)

---

## Folder Architecture

```
backend/
├── src/
│   ├── config/             # DB settings, Swagger JSON config
│   ├── controllers/        # Route controllers parsing inputs & returning JSON
│   ├── middleware/         # Session validations, RBAC limits, error handlers
│   ├── models/             # Mongoose schemas (User, Patient, Doctor, etc.)
│   ├── repositories/       # Abstraction layer mapping db operations
│   ├── routes/             # Route registries for modules
│   ├── services/           # Business logic coordination
│   ├── utils/              # winston logger, JWT signers, custom AppError classes
│   ├── validators/         # Zod validator request schemas
│   ├── types/              # Type extensions (Express Request type extensions)
│   ├── app.ts              # Express application initializer
│   └── server.ts           # Server start script (DB loader & port listener)
```

---

## APIs & Swagger Documentation

Once the server is running, the **Swagger API Playground** is available at:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

### Summary of Endpoint Modules:
- **Authentication**:
  - `POST /api/auth/register` (Register a new account)
  - `POST /api/auth/login` (Create session token, sets HTTP-Only Cookie)
  - `POST /api/auth/logout` (Clears cookies)
  - `GET /api/auth/me` (Fetch details of currently signed-in profile)
- **Patients**:
  - `GET /api/patients` & `POST /api/patients` (CRUD)
  - `GET`, `PUT`, `DELETE` at `/api/patients/:id`
- **Doctors**:
  - `GET /api/doctors` & `POST /api/doctors` (CRUD)
  - `GET`, `PUT`, `DELETE` at `/api/doctors/:id`
- **Appointments**:
  - `GET /api/appointments` & `POST /api/appointments`
  - `GET /api/appointments/:id` & `DELETE /api/appointments/:id`
  - `PUT /api/appointments/:id/status` (Confirm / cancel appointment slots)
- **Medicines (Pharmacy Inventory)**:
  - `GET /api/medicines` & `POST /api/medicines` (Stock entry updates)
  - `GET`, `PUT`, `DELETE` at `/api/medicines/:id`
- **Prescriptions**:
  - `GET /api/prescriptions` & `POST /api/prescriptions` (Doctor log records)
  - `GET`, `PUT`, `DELETE` at `/api/prescriptions/:id`
- **System Health**:
  - `GET /health` (System diagnostics)

---

## Setup & Running Locally

### 1. Prerequisites
- Node.js (v20 or higher)
- Local MongoDB instance running, or MongoDB Atlas connection credentials.

### 2. Configure Environment Variables
Duplicate `.env.example` to create a local `.env` file:
```bash
cp .env.example .env
```
Fill in the configuration variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medicare_hms
JWT_SECRET=supersecretjwtkeyforfastcuredevdevelopment
JWT_EXPIRES_IN=7d
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Running the Dev Server (with Auto-reload)
```bash
npm run dev
```

### 5. Compiling & Production Execution
Build the TypeScript sources:
```bash
npm run build
```
Run the compiled bundle:
```bash
npm start
```

---

## 🐳 Docker & Docker Compose Setup

This project can be containerized using the included Docker assets to run in any isolated environment (including AWS ECS, EC2, or local developer configurations) alongside a MongoDB server.

### 1. Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (macOS, Windows, or Linux)
* [Docker Compose](https://docs.docker.com/compose/install/) (included in Docker Desktop)

### 2. Configure Environment Variables
Duplicate `.env.example` to create `.env`:
```bash
cp .env.example .env
```
Ensure the variables are populated. When running inside Docker Compose, the database server is resolved using the service hostname `mongodb`. Thus, set:
```env
MONGO_URI=mongodb://mongodb:27017/medicare_hms
```

### 3. Build & Start Containers
Start the services in detached mode (background):
```bash
docker compose up --build -d
```
This starts two containers:
* **`fastcure-mongodb`**: A MongoDB server persistent volume map.
* **`fastcure-backend`**: The Node.js Express server listening on port `5000`.

### 4. Stop Containers
To bring down the containers and preserve database volumes:
```bash
docker compose down
```
To stop the containers and completely wipe out the persistent database volume storage:
```bash
docker compose down -v
```

### 5. Troubleshooting
* **Database Connection Timeout**: Ensure the database service matches the hostname in your `.env` connection string (`mongodb://mongodb:27017/medicare_hms`).
* **Port Conflicts**: If port `5000` or `27017` is already bound to another local service, stop that service or edit the mapping ports inside `docker-compose.yml`.
* **Inspect Container Logs**: Inspect logs for the backend server to diagnose starting errors:
  ```bash
  docker logs fastcure-backend
  ```

---

## 🚀 Production AWS EC2 Deployment

Complete step-by-step guides and configurations are available in the [docs/](docs) directory:

1. **EC2 Provisioning & Security**: See [docs/aws_deployment.md](docs/aws_deployment.md) to set up security groups, launch Ubuntu instances, and configure backups/rollbacks.
2. **Nginx Reverse Proxy**: Use [docs/nginx.conf.example](docs/nginx.conf.example) to establish connection maps routing incoming HTTP/HTTPS traffic to the containers.
3. **Docker Launch Setup**: Follow [docs/docker_deployment.md](docs/docker_deployment.md) to install Docker, load environments, and manage service lifecycles.
4. **SSL/TLS Encryption**: See [docs/ssl_setup.md](docs/ssl_setup.md) to configure Let's Encrypt certificates using Certbot.
5. **Fallback Node runner**: If Docker is not preferred, check [pm2.config.js](pm2.config.js) to configure cluster execution via PM2.

