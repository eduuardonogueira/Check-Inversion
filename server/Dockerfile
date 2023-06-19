FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i @prisma/client

RUN prisma generate

COPY . .

EXPOSE 3333