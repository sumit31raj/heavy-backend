<p align="center">
  <h1>Heavy Backend API Server</h1>
</p>

## Pre-Requisite

- Nodejs
- Docker
- Postgres

## Description

- API server will fetch the hexadecimal value and respective IP address from frontend and check weather the data with same hexadecimal value is already present or not also validate that only one request has been accepted from same IP in 24 hours.
- Valid hexadecimal value and IP address stores into the database with default status to pending. - Cron Jobs will execute after every 10 sec and pick all the pending status hexadecimal value from the database and add into Bull Queue based on Redis.

## Instructions

- For setup API server on local machine, follow the instructions below
- Create a .env file in root folder, refer to .env.example in root repository for necessary environment variables
- Execute Migration file to create table into the database, you can find the Migration command below

## Add .env

```bash
$ cp .env.example .env
```

## Migration

```bash
$ npm run typeorm:migrate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Postman Collection

<a target="_blank" href="./HeavyBackend.postman_collection.json">Postman Collection</a>

## Postman Collection Documentation

<a target="_blank" href="https://documenter.getpostman.com/view/17045303/VUjSENp7">View Postman Collection Documentation</a>
