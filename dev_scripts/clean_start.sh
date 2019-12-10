#!/bin/bash

cd ..

docker-compose rm -f
docker volume prune -f
docker system prune -f

source ./start.sh