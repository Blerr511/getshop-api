FROM node:14

WORKDIR /app

RUN npm i -g @nestjs/cli

COPY package.json package-lock.json ./

RUN npm ci

COPY . .
