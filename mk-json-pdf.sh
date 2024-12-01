#!/bin/sh

# Make copies of the JSON and PDF data available

cp node_modules/@constellation-cards/cards/dist/cards.json public/

docker run \
  -v $PWD/public:/public \
  -e CRUX_CARDS_JSON=/public/cards.json \
  -e CRUX_CARDS_BUILD=/public \
  ghcr.io/constellation-cards/crux:latest
