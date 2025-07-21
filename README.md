# Book Review Microservice

This is a simple Book Review Microservice built with **Node.js**, **TypeScript**, **GraphQL**, **MongoDB**, and **Redis**. It demonstrates scalable backend architecture using **PNPM workspaces**, a **monorepo** structure, **Docker** containerization, and a **BullMQ-powered background worker**.

The service allows clients to:

- Query a list of books and their reviews
- Submit a review for a book

---

## 📦 Monorepo Structure

apps/
├── api/ # GraphQL API service
└── worker/ # BullMQ worker service

packages/
├── db/ # MongoDB connection and Mongoose models
└── queue/ # BullMQ queue instance for background jobs

Dockerfile # Generic Dockerfile to build any app (via APP_NAME argument)

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js v20+
- PNPM (https://pnpm.io/)
- MongoDB running locally or remotely
- Redis server running locally or remotely
- Docker (optional, for container builds)

### Install Dependencies

pnpm install

### Environment Configuration

Each app (`api`, `worker`) requires its own `.env` file.

Example `.env` contents (shared by both apps):

MONGO_URI=mongodb://localhost:27017/book-review
REDIS_HOST=redis://localhost:6379
REDIS_PASSWORD=\*\*\* # Optional
PORT=4000 # Only required for API
You should place these files inside the following directories:

apps/api/.env.dev — for running the API locally
apps/worker/.env.dev — for running the worker locally
apps/api/.env.docker.dev — for running the API in Docker
apps/worker/.env.docker.dev — for running the worker in Docker
Make sure to load the appropriate file based on your environment (dev or docker).

🚀 Run Instructions

Run API Server (GraphQL)
pnpm dev:api
GraphQL Playground will be available at: http://localhost:4000/graphql

Run Worker
pnpm dev:worker
This will start the background processor that consumes jobs from the BullMQ queue and appends a static string to submitted reviews.

🧪 Testing

Unit tests are implemented using Jest, specifically for the addReview GraphQL mutation resolver.

To run tests:

pnpm test

🐳 Docker Instructions

This monorepo uses a generic root-level Dockerfile that can be used to build any app in the apps/ folder using the APP_NAME build argument.

Build API Docker Image
docker build --build-arg APP_NAME=api -t book-api .
Build Worker Docker Image
docker build --build-arg APP_NAME=worker -t book-worker .
You can optionally create a docker-compose.yml to orchestrate MongoDB, Redis, API, and Worker containers together.

📐 Design Decisions

Monorepo with PNPM Workspaces: Improves dependency management and code modularity. Apps and packages are cleanly separated.
GraphQL Yoga: Lightweight and developer-friendly server with minimal boilerplate.
MongoDB + Mongoose: Flexible and quick to set up for prototyping and schema modeling.
Redis + BullMQ: Reliable queueing and background processing with minimal overhead.
Docker (Generic Build): A single, parameterized Dockerfile reduces repetition and simplifies build logic.
Decoupled Packages: Common logic like DB connection and queue instance are extracted into shared packages for reusability.
🔧 Suggested Future Improvements

Add authentication & authorization (e.g., JWT-based auth)
Enhance input validation using zod, yup, or similar
Add pagination & filtering for getBooks
Integrate rate limiting and request throttling
Add API logging using pino or winston
Add E2E tests and expand test coverage
Create a CI/CD pipeline for testing, linting, and Docker builds
Add monitoring and metrics (e.g., Prometheus + Grafana)
Use Kubernetes for orchestrating multi-container deployments
📄 License

MIT License — feel free to use and adapt for your own projects.

👨‍💻 Author Notes

This project was implemented as part of a Senior Platform Engineer (GraphQL) assignment. All design decisions were made with modularity, scalability, and demonstration of core backend architecture skills in mind.

```

```
