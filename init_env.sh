#!/bin/bash
# Only for development environment.
# Edit from docker-compose.yml directly if needed.
# Changing these values is currently only partly supported.
MYSQL_DATABASE="chirpdb"
MYSQL_USER="chirpweb"
MYSQL_HOST="127.0.0.1"
MYSQL_PORT="3306"

# THESE VALUES SHOULD BE UPDATED BY YOU
# Values will be passed to docker containers
MYSQL_PASSWORD="YOUR PASSWORD HERE"
MYSQL_ROOT_PASSWORD="YOUR PASSWORD HERE"
WEB_TOKEN_PRIVATE_KEY="YOUR TOKEN HERE"
CORS_SITES="http://localhost https://localhost"

export MYSQL_DATABASE
export MYSQL_USER
export MYSQL_PASSWORD
export MYSQL_HOST
export MYSQL_PORT
export WEB_TOKEN_PRIVATE_KEY
export CORS_SITES

echo $MYSQL_ROOT_PASSWORD > ./db_root_password.txt
echo $MYSQL_PASSWORD > ./db_password.txt
echo $WEB_TOKEN_PRIVATE_KEY > ./token_pk.txt
echo $CORS_SITES > ./cors_sites.txt