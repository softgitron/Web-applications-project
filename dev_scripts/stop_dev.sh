#!/bin/bash

cd ..
sudo docker-compose stop db
sleep 3
sudo killall screen