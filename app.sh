#!/bin/bash
export DATABASE_URL="file:/app/server/prisma/dev.db"

cd /app/server
npm install
(npm run start&)

cd /app/web
npm install
npm audit fix
(npm run start&)