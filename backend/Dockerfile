# ─────────────────────────────────────────────
#  STAGE 1: Dependencies
# ─────────────────────────────────────────────
FROM node:20-alpine AS deps

# Instalar dependencias del sistema necesarias para sharp / vips
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev \
    && rm -rf /var/cache/apk/*

WORKDIR /opt/

COPY package.json package-lock.json ./

RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install

ENV PATH=/opt/node_modules/.bin:$PATH

# ─────────────────────────────────────────────
#  STAGE 2: Application
# ─────────────────────────────────────────────
FROM deps AS app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY --from=deps /opt/node_modules /opt/node_modules

COPY . .

RUN chown -R node:node /opt/app
USER node

# Build solo en producción
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 1337

CMD ["npm", "run", "develop"]
