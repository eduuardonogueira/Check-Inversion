FROM alpine:latest

WORKDIR /app

COPY . ./

EXPOSE 3333 5173

RUN ./create.sh