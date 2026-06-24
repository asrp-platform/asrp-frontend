# syntax=docker/dockerfile:1.7

FROM node:20-bookworm-slim AS base

WORKDIR /app


# ---------- dependencies ----------
FROM base AS deps

COPY package.json package-lock.json ./

RUN --mount=type=cache,id=asrp-frontend-npm-cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit --no-fund


# ---------- build ----------
FROM base AS builder

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# ---------- production ----------
FROM node:20-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]