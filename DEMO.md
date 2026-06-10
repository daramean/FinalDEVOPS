# Demo Guide

This document explains how to demonstrate the Library Management System and its DevOps pipeline.

## Local Demo

1. Copy `.env.example` to `.env` and set secure values for:
   - `DB_PASSWORD`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `REDIS_PASSWORD`
   - `GRAFANA_ADMIN_PASSWORD`

2. Start the stack with Docker Compose:

```bash
docker compose up --build
```

3. Open the demo URLs:
   - Frontend: `http://localhost`
   - Backend API: `http://localhost/api/v1`
   - Prometheus: `http://localhost:9090`
   - Grafana: `http://localhost:3001`
   - API docs: `http://localhost/api/docs`

4. Verify the system:
   - Authenticate or register with `/api/v1/auth/register`.
   - Create, read, update, delete books, borrows, and users.
   - Check PostgreSQL persistence and Redis cache connectivity.
   - Review backend `/metrics` for Prometheus scraping.
   - Confirm Grafana has the Prometheus datasource configured.

## Kubernetes Demo

1. Configure `kubectl` for your cluster.
2. Apply the kustomized manifests:

```bash
kubectl apply -k k8s
```

3. Confirm the namespace and resources:

```bash
kubectl get all -n obito-store
```

4. For production, deploy from `main` and use GitHub Actions to perform blue/green releases.

## CI/CD Demo

- `develop` branch deploys to the development cluster.
- `main` branch deploys to production using blue/green deployment.
- GitHub Actions perform lint, tests, Docker image build, and Kubernetes deployment.

## Monitoring & Logging

- Prometheus scrapes backend metrics from `/metrics`.
- Grafana is provisioned with a Prometheus datasource.
- Backend logs are written to stdout and local log files under `backend/logs`.
- The Grafana dashboard displays application CPU and memory metrics.
