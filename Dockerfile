FROM alpine:latest

WORKDIR /app

COPY . ./

EXPOSE 3333 5173

RUN apk update

RUN apk add npm
RUN cd /app/server
RUN npm install
RUN npm audit fi
RUN cd /app/web
RUN npm install