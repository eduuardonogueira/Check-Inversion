FROM alpine:latest

WORKDIR /app

COPY package*.json ./

RUN apk add npm 

RUN npm audit fix

RUN npm install

COPY . .

EXPOSE 5173