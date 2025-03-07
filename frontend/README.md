# Frontend Service

React-based frontend service for Git CRM system.

## Tech Stack

- React v19
- TypeScript
- Vite v6
- Material-UI v6
- React Query v5
- React Router v7
- Formik + Yup
- Axios

## Prerequisites

- Node.js v22.14.0 or higher
- npm

## Installation

```bash
# Install dependencies
npm ci
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:8080
```

## Development

```bash
# Start development server
npm run dev
```

The development server will start at `http://localhost:5173` with hot reload enabled.

## Building for Production

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```

The production build will be available in the `dist` directory.

## Code Quality

```bash
# Run linter
npm run lint
```

## Docker

Build the image:

```bash
docker build -t git-crm-frontend .
```

Run the container:

```bash
docker run -p 80:80 \
  -e VITE_API_URL=http://localhost:8080 \
  git-crm-frontend
```
