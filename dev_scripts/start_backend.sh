#!/bin/bash

cd ..
source ./init_env.sh
cd backend
screen -S backend -d -m sudo -E npm start