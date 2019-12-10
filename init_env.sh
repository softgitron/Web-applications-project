#!/bin/bash
MYSQL_DATABASE="chirpdb"
MYSQL_USER="chirpweb"
MYSQL_PASSWORD=""
MYSQL_ROOT_PASSWORD=""
MYSQL_HOST="127.0.0.1"
MYSQL_PORT="3306"
WEB_TOKEN_PRIVATE_KEY=""
CORS_SITES="http://localhost https://localhost http://192.168.3.13"

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
