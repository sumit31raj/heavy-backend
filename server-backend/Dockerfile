FROM node:alpine

WORKDIR /home/app/backend

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build
