# ─────────────────────────────────────────────
#  STAGE 1: Dependencies
# ─────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# ─────────────────────────────────────────────
#  STAGE 2: Development / Production
# ─────────────────────────────────────────────
FROM node:20-alpine AS app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

EXPOSE 5173

# Vite dev server con host 0.0.0.0 para ser accesible desde el host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
