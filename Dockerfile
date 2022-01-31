FROM node:14

WORKDIR /app

RUN npm i -g @nestjs/cli

COPY package.json yarn.lock ./

RUN npm i

ENV NODE_ENV="development"

ADD . .
