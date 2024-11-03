FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

COPY . /api
WORKDIR /api

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base
COPY --from=prod-deps /api/node_modules /api/node_modules

EXPOSE 3000

# DEV
CMD [ "pnpm", "run", "dev" ]

## PROD
#CMD [ "pnpm", "run", "start" ]
