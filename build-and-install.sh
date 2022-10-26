#!/usr/bin/env bash

npm run make
unzip out/make/zip/darwin/arm64/lofi-player-darwin-arm64-1.0.0.zip
rm -rf  ~/Applications/lofi-player.app && mv lofi-player.app ~/Applications
