#!/bin/bash

source ./init_env.sh

cp server.cert ./backend
cp server.key ./backend

docker-compose build
docker-compose up