FROM node

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /api

COPY package.json /api
RUN pnpm i

COPY . /api

EXPOSE 3000

CMD [ "pnpm", "exec", "nodemon", "server.js"]
