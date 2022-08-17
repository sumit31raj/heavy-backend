# HeavyBackend Hash Consumer

## Pre-Requisite

- Nodejs
- Docker
- Postgres

## Description

- Hash Consumer will fetch the job data from the Bull queue and start finding the keccak256 that is lower than the given hexadecimal value.
- Once getting the valid nounce value for the given hexadecimal value, update status to completed at the backend side and send the resulting nounce value as response.
- For increasing the scalability we just created separated batches based on nounce range. Currently we setup the max batch size of 10,000 after that new batch will be created.

## Instructions

- For setup the API server on local machine, follow the instructions below
- Create a .env file in root folder, refer to .env.example in root repository for necessary environment variables
- Then execute the below bash command

```bash
$ npm i
```

## Add env

```
bash
$ cp .env.example .env
```

## Running the app

```bash
$ npm start
```
