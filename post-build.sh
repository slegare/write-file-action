#!/bin/bash
cp package.json ./dist/
cd dist
yarn install --prod
cd ..