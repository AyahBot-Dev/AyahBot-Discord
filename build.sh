#!/usr/bin/env bash
npx tsc
cp package.json build
cp .env build
cp ecosystem.config.js build
cd build
npm install --omit=dev