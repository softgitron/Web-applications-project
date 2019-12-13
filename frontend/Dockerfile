FROM node:13.2.0

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g serve

COPY . .

RUN npm run-script build

EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "8080"]