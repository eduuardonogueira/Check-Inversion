FROM alpine:latest

WORKDIR /app

COPY package*.json ./

RUN apk add npm 

RUN npm install

COPY . .

EXPOSE 3333