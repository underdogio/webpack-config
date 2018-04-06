#!/usr/bin/env bash
set -e
set -x

rm -rf dist
mkdir -p dist

# Copy source and package.json file to dist/
cp -R package.json lib/. dist/

# cd into dist/ and publish
cd dist
npm publish

# Clean up
cd ..
rm -rf dist
