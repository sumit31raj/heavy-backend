# Heavy Backend

## Pre-Requisite

- Nodejs
- Docker
- Postgres

# Running the app with docker

Install[docker-compose]

```bash
$ docker-compose up
```

# server-backend

## Description

- API server will fetch the hexadecimal value and respective IP address from frontend and check weather the data with same hexadecimal value is already present or not also validate that only one request has been accepted from same IP in 24 hours.
- Valid hexadecimal value and IP address stores into the database with default status to pending. - Cron Jobs will execute after every 10 sec and pick all the pending status hexadecimal value from the database and add into Bull Queue based on Redis.

## Instructions

- For setup API server on local machine, follow the instructions below
- Create a .env file in root folder, refer to .env.example in root repository for necessary environment variables
- Execute Migration file to create table into the database, you can find the Migration command below

## Add .env

```bash
$ cd /server-backend

$ npm i

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

# consumer

## Description

- Hash Consumer will fetch the job data from the Bull queue and start finding the keccak256 that is lower than the given hexadecimal value.
- Once getting the valid nounce value for the given hexadecimal value, update status to completed at the backend side and send the resulting nounce value as response.
- For increasing the scalability we just created separated batches based on nounce range. Currently we setup the max batch size of 10,000 after that new batch will be created.

## Instructions

- For setup the API server on local machine, follow the instructions below
- Create a .env file in root folder, refer to .env.example in root repository for necessary environment variables
- THen execute the below bash command

```bash
$ cd /consumer

$ npm i

$ cp .env.example .env

$ npm start
```

# frontend

## Description

- UI consist of input field where user can enter any 256-bit hexadecimal value and send it to server for calculation
- User can also check the status of given hexadecimal value

## Instructions

```bash
$ cd /frontend
```

- Execute the command `npm install` to install all the dependecies

## How to create and use new environment variable

```bash
$ cp .env.example .env
```

- Add your backend url inside .env

## Frontend Preview

![Frontend Preview](/frontend/src/assets/heavyBackend.png)
