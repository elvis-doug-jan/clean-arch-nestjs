
### 🧑‍💻 Development

FROM public.ecr.aws/docker/library/node:20-alpine as dev

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV $CONFIG_ENVIRONMENT

COPY --chown=node:node . .

RUN npm i -g pnpm

RUN pnpm i

USER node


### 🏡 Prod Build

FROM public.ecr.aws/docker/library/node:20-alpine as build

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV $CONFIG_ENVIRONMENT

COPY --chown=node:node --from=dev /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

USER node

## 🚀 Production

FROM public.ecr.aws/docker/library/node:20-alpine as prod

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV $CONFIG_ENVIRONMENT

COPY --chown=node:node --from=build /app/dist dist

COPY --chown=node:node --from=build /app/node_modules node_modules

COPY --chown=node:node --from=build /app/prisma prisma

COPY --chown=node:node --from=build /app/package.json /app/nest-cli.json ./

USER node

EXPOSE $PORT

CMD ["node", "dist/main.js"]
