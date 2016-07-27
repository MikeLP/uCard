#!/usr/bin/env bash

if [ -d "./node_modules/sqlite3" ]; then
  # Control will enter here if $DIRECTORY doesn't exist.
  rm -rf node_modules/sqlite3
fi
npm i --S sqlite3 --build-from-source --runtime=electron  --dist-url=https://atom.io/download/atom-shell --target_arch=x64 --target="1.3.1"
