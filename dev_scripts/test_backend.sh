#!/bin/bash

cd ..
source ./init_env.sh

cd backend
export BACKEND_PORT="4040"
npm test