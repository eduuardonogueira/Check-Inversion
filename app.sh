#!/bin/bash

cd /app/server
npm install
npm run dev &

cd /app/web
npm install
npm run dev &