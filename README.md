<p align="center">
  <a href="[http://nestjs.com/](http://nestjs.com/)" target="blank"><img src="[https://nestjs.com/img/logo-small.svg](https://nestjs.com/img/logo-small.svg)" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

A RESTful API for Star Wars data, built with NestJS and running on Docker.

## 🚀 Quick Start with Docker (Recommended)

This is the fastest and most reliable way to get the project running. It handles the application, database, and networking for you.

### Prerequisites

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)
* `make` (usually pre-installed on Linux/macOS)

### 1. Set Up Environment File

Create a `.env` file for your local environment. You can copy the provided example file. This file will hold all your configuration and secrets.

```bash
cp .env.example .env
```

Your `.env` file should look like this. You typically do not need to change these values for the Docker setup.

```dotenv
# .env

# Application Port
PORT=3000

# Database Connection Details for NestJS App
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=swapi

# PostgreSQL Container Credentials (must match the above)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=swapi

# Port to expose on the host machine for the database
# You can connect from your PC using localhost:5433
HOST_DB_PORT=5433
```

**Important**: The `.env` file should **never** be committed to version control. It is already included in the `.gitignore` file.

### 2. Start the Application

Use the `make` command to build the Docker images and start the services in the background.

```bash
make start
```

This command will:

1.  Build the Docker image for the NestJS application.
2.  Start containers for both the application and the PostgreSQL database.
3.  Apply any pending database migrations automatically.

### 3. Access the API

The application will be running on port 3000 by default. You can access the API documentation here:
[http://localhost:3000/documentation](http://localhost:3000/documentation)

### 4. Stopping the Application

To stop all running services, simply run:

```bash
make stop
```

### Useful Makefile Commands

* `make logs`: View live logs from the app and database.
* `make app-shell`: Open a command-line shell inside the application container.
* `make db-shell`: Open a `psql` shell to interact directly with the database.
* `make help`: Show all available commands.

## 💻 Local Development (Without Docker)

Use this method if you prefer to manage the Node.js environment and database on your local machine.

### 1. Installation

Install project dependencies.

```bash
$ make setup
```

### 2. Database Setup

1.  Install PostgreSQL on your local machine.
2.  Ensure the PostgreSQL service is running.
3.  Create a user and a new database. For Linux (**Ubuntu**), you can use:

    ```bash
    sudo systemctl start postgresql
    sudo -u postgres psql
    CREATE DATABASE swapi;
    ```

4.  Create a `.env` file in the project root and fill it with your local database credentials. **Note**: The `HOST` will be `localhost`.

    ```dotenv
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_local_user
    DB_PASSWORD=your_local_password
    DB_DATABASE=swapi
    ```

### 3. Running the App

Run the database migrations and then start the app in watch mode.

```bash
# Run migrations
$ npm run typeorm:run-migrations

# Start with hot-reload
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Original API

This project is an implementation based on the original [swapi.dev](https://swapi.dev/).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

* Author - [Pavlo Zhurbytskyi](https://kamilmysliwiec.com)
* Website - [https://nestjs.com](https://nestjs.com/)
* Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
