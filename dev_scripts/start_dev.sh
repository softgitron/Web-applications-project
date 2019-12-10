#!/bin/bash

cd ..
./init_env.sh

# To allow database communication from outside
# sed -i '/bind-address/s/^#//g' /etc/mysql/my.cnf
# screen -S db -d -m sudo docker-compose -p 3306:3306 run db bash
screen -S db -d -m sudo docker-compose run -p 3306:3306 db
cd frontend
export PORT=80
# export HTTPS=true
screen -S front -d -m sudo -E npm start
# sleep 1
# docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q)