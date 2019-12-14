# Web-applications-project

Microblogging project work related to web applications course (Chirp-Web) <br>
![Chirp-Web Main page](https://raw.githubusercontent.com/softgitron/Web-applications-project/master/docs/pictures/Main_page.png)
Live demo available [here](http://chirp-web.rahtiapp.fi/)

## About this project

This project was made as a practice work for a LUT:s web programming course. This is second time I ever used React framework and first time I utilized Redux. I think project succeeded pretty well. I managed to create fully working REST-api and pretty beautiful UI witch is also fully responsive. Friend request and notification system would have been interesting to implement, but unfortunately I didn't have enough time to do that. Maybe next time then :)

## Quick start

Server is fairly easy to setup since its fully Docker compatible.
Steps:

1. Install docker and docker compose
    - View theses sites to get instruction how to install required packages [docker](https://www.docker.com/) / [docker compose](https://docs.docker.com/compose/)
    - On my personal favorite Linux distribution Arch-linux packages may be installed with command `sudo pacman -S docker docker-compose`
2. Clone this repository with command `git clone https://github.com/softgitron/Web-applications-project.git`
3. Configure cloned repository
    - Open _init_env.sh_ file with your Favorite text editor
    - Change _MYSQL_PASSWORD_, _MYSQL_ROOT_PASSWORD_, _WEB_TOKEN_PRIVATE_KEY_ and _CORS_SITES_ to your liking.
    - _MYSQL_PASSWORD_, _MYSQL_ROOT_PASSWORD_ and _WEB_TOKEN_PRIVATE_KEY_ should contain long random strings for maximum security. Special characters in mysql passwords may cause problems so it is not recommended.
    - _CORS_SITES_ should contain all addresses where user can access application. For local testing value http://localhost:8080 should be sufficient. If you are planning to deploy this application to the internet use your site address instead like http://chirp-web.rahtiapp.fi/.
    - It's **IMPORTANT** to set these values since without them application won't work and security would be severely impacted.
    - Changing other values in this file is not fully supported. Other values are mainly used for testing.
4. Start server
    - Start server with command `./start.sh`
5. After some waiting server should be up and running. Server can be accessed by default from address http://localhost:8080

## Documentation

Please see repository's [Wiki page](https://github.com/softgitron/Web-applications-project/wiki) for more documentation.

## Mentions

-   [Sign-in](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in) and [Sign-up](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up) pages provided by [Material UI examples](https://material-ui.com/getting-started/templates/)
-   Backend provided by [Node](https://nodejs.org/en/)
-   Frontend provided by [React](https://reactjs.org/)
-   Database provided by [Mysql](https://www.mysql.com/)
