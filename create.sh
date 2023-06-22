#!/bin/sh
apk update
apk add npm

cd /app/server
export DATABASE_URL="file:/app/server/prisma/dev.db"
npm install
npm audit fix
(npm run start&)

cd /app/web
npm install
(npm run start&)