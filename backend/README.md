# Backend Service

NestJS-based backend service for Git CRM system.

## Tech Stack

- NestJS v11
- TypeScript
- PostgreSQL (via TypeORM)
- MongoDB (via Mongoose)
- RabbitMQ (for message queue)
- Swagger (for API documentation)
- GitHub API integration

## Prerequisites

- Node.js v22.14.0 or higher
- npm
- PostgreSQL
- MongoDB
- RabbitMQ

## Environment Variables

Copy the sample environment file:

```bash
cp .env.sample .env
```

Required environment variables:

```env
# Database Configuration
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=gitcrm

# MongoDB Configuration
MONGODB_URI=mongodb://user:password@mongodb:27017/gitcrm?authSource=admin

# RabbitMQ Configuration
RABBITMQ_URL=amqp://user:password@rabbitmq:5672

# Authentication
AUTH_SECRET=secret

# GitHub Integration
GITHUB_ACCESS_TOKEN=github_access_token

# API Documentation
SWAGGER_USERNAME=admin
SWAGGER_PASSWORD=p@ssw0rd123

# CORS Configuration
FRONTEND_HOST=http://localhost
```

## Installation

```bash
# Install dependencies
npm ci
```

## Database Migrations

```bash
# Run migrations
npm run migration:run

# Create a new migration
npm run migration:create name-of-migration

# Generate a migration from entity changes
npm run migration:generate src/migrations/name-of-migration

# Revert last migration
npm run migration:revert
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Debug mode
npm run start:debug

# Production mode
npm run build
npm run start:prod
```

## Development

```bash
# Format code
npm run format

# Lint code
npm run lint
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:8080/api/docs
```

Use the following credentials:

- Username: admin
- Password: p@ssw0rd123

## Docker

Build the image:

```bash
docker build -t git-crm-backend .
```

Run the container:

```bash
docker run -p 8080:8080 \
  -e POSTGRES_HOST=postgres \
  -e POSTGRES_PORT=5432 \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=gitcrm \
  -e MONGODB_URI=mongodb://user:password@mongodb:27017/gitcrm?authSource=admin \
  -e RABBITMQ_URL=amqp://user:password@rabbitmq:5672 \
  -e AUTH_SECRET=secret \
  -e GITHUB_ACCESS_TOKEN=your_github_token \
  -e SWAGGER_USERNAME=admin \
  -e SWAGGER_PASSWORD=p@ssw0rd123 \
  -e FRONTEND_HOST=frontend_host \
  git-crm-backend
```
