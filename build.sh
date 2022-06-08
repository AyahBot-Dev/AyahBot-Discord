#!/usr/bin/env bash
rm -rf build ||:
yarn install
yarn tsc
cp package.json build
cp .env build
cp ecosystem.config.cjs build
cd build
sed -i "s/commonjs/module/" package.json
yarn install --production
exit 0