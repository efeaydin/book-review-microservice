# Use build arg to specify the app folder
ARG APP_NAME=api

# --- Base image ---
FROM node:20-alpine AS base
WORKDIR /app
COPY . .

# --- Install dependencies ---
FROM base AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
RUN pnpm --filter "./packages/**" build

# --- Build specific app ---
FROM deps AS build
ARG APP_NAME
WORKDIR /app/apps/${APP_NAME}
RUN pnpm run build

CMD ["pnpm", "start-docker"]