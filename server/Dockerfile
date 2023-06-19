FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i @prisma/client

COPY . .

EXPOSE 3333