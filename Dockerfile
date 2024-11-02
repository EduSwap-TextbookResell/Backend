FROM node

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /api

COPY package.json /api
RUN pnpm i

COPY . /api

EXPOSE 3000

# DEV
CMD [ "pnpm", "exec", "nodemon", "-q", "server.js"]

## PROD
#RUN pnpm i -g pm2
#CMD [ "pm2-runtime", "server.js" ]
