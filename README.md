## Node.js backend clean architecture boilerplate

## Installation

```bash
$ nvm use
$ yarn install
```

## Running the app

Copy the .env.example to .env and configure variables.

Ensure the database connection

```bash

# run migrations
$ npx prisma migrate dev

# generate the prisma types
$ npx prisma generate

# development
$ yarn run start

# watch mode (use this)
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```

