# Link to the task:

https://github.com/ivz-dev/FullStack-Test-Task

## Prerequisites

- Docker and Docker Compose
- Git

## Project Structure

```
.
├── frontend/    # React frontend application
├── backend/     # Node.js backend application
└── compose.yaml # Docker Compose configuration
```

## Quick Start

1. Clone the repository:

```bash
git clone <repository-url>
cd git-crm
```

2. Set up environment variables:

   - Create `backend/.env` file with necessary environment variables
     (
     AUTH_SECRET=secret
     GITHUB_ACCESS_TOKEN=github_access_token
     )

3. Start the application:

```bash
docker compose up -d
```

This will start:

- Frontend at http://localhost
- Backend API at http://localhost:8080
- PostgreSQL database at localhost:5432
- MongoDB at localhost:27017
- RabbitMQ at localhost:5672 (Management UI at http://localhost:15672)

## Monitoring Logs

### View logs for all services:

```bash
docker compose logs -f
```

### View logs for specific services:

Frontend logs:

```bash
docker compose logs -f frontend
```

Backend logs:

```bash
docker compose logs -f backend
```

Database logs:

```bash
docker compose logs -f postgres
docker compose logs -f mongodb
```

Message queue logs:

```bash
docker compose logs -f rabbitmq
```

## Development Commands

Start the entire stack:

```bash
docker compose up -d
```

Stop all services:

```bash
docker compose down
```

Rebuild and start services:

```bash
docker compose up -d --build
```

Remove all containers and volumes:

```bash
docker compose down -v
```

## Accessing Services

- Frontend: http://localhost
- Backend API: http://localhost:8080
- Swagger Documentation: http://localhost:8080/api/docs
  - Username: admin
  - Password: p@ssw0rd123
- RabbitMQ Management UI: http://localhost:15672
  - Username: user
  - Password: password

## Troubleshooting

1. If services fail to start, check logs:

```bash
docker compose logs -f
```

2. To restart a specific service:

```bash
docker compose restart <service-name>
```

3. To check service status:

```bash
docker compose ps
```

4. To view service health checks:

```bash
docker compose ps --format "table {{.Name}}\t{{.Status}}"
```
