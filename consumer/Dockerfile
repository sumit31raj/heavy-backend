FROM node:alpine

WORKDIR /home/app/consumer

COPY package.json ./

RUN yarn install

COPY . .
