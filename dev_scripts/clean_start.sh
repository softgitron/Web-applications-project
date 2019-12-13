#!/bin/bash

# https://stackoverflow.com/questions/3231804/in-bash-how-to-add-are-you-sure-y-n-to-any-command-or-alias
read -r -p "Are you sure? This will reset docker containers machine wide [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
then
    cd ..

    docker-compose rm -f
    docker volume prune -f
    docker system prune -f

    source ./start.sh
else
    exit
fi