FROM node:alpine

WORKDIR /home/app/frontend

COPY package.json ./

RUN yarn install

COPY . .
