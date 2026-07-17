# Docker & Docker Compose Deployment Guide

This guide details installing Docker and spinning up FastCure backend services on the remote server.

---

## 1. Docker Installation
Run the official Docker convenience script to install Docker:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
Configure your user group to allow running Docker commands without prefixing `sudo`:
```bash
sudo usermod -aG docker $USER
newgrp docker
```

---

## 2. Docker Compose Installation
Install Docker Compose via your package manager:
```bash
sudo apt update
sudo apt install -y docker-compose-plugin
```
Verify the installation was successful:
```bash
docker compose version
```

---

## 3. Clone Repository & Setup Environment
Clone the backend repository onto the remote host:
```bash
git clone https://github.com/hemanthkumar-del/medicare_hms_backend.git hms_backend
cd hms_backend
```
Create a production `.env` configuration:
```bash
cp .env.example .env
nano .env
```
Ensure the settings point to the internal container URI mapping:
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb://mongodb:27017/medicare_hms
JWT_SECRET=yoursecretkey
JWT_EXPIRES_IN=7d
```

---

## 4. Build and Launch Services
Start the containers in background mode:
```bash
docker compose up --build -d
```
Check if both containers are healthy:
```bash
docker compose ps
```

---

## 5. Monitoring & Logs
Inspect real-time logs for backend errors:
```bash
docker logs -f fastcure-backend
```
Monitor CPU, memory, and networking loads:
```bash
docker stats
```
Check health diagnostics via HTTP request:
```bash
curl http://localhost:5000/health
```
