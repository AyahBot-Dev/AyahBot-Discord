#!/usr/bin/env bash
yarn tsc
cp package.json build
cp .env build
cp ecosystem.config.js build
cd build
yarn install --production