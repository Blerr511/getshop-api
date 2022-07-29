<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

Rename `.env.example` into `.env`

### With docker-compose

use

To run application

```bash
# Run services and backend
$ npm run docker:dev:up

# Down services and backend
$ npm run docker:dev:down
```

To run services only

```bash
# Run services
$ npm run docker:services:up

# Down services
$ npm run docker:services:down

# Run backend
$ npm run start:dev
```

- Note this may require changes in .env

### Without docker-compose

- Install and bootstrap postgres V13.4

- `npm run start:dev`

```bash
# Install dependencies
$ npm install
```

## Development

Follow [coding-style](coding-style.md) guideline
