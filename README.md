# Voice Note Notification Service

A service that is responsible for storing voice notes from pilots and streaming them to the involved customers.

## Setup

### Datastores

#### Mongodb
The service depends on Mongodb as the main database.

To install mongodb on your local machine using docker
```sh
$ docker run --name local-mongo -dp 27017:27017 mongo:latest
```

#### AWS SQS
The service uses AWS SQS for message queueing. 

To install AWS SQS API compatible service on your local machine for development
```sh
$ docker run --name local-sqs -p 9324:9324 -p 9325:9325 -d roribio16/alpine-sqs:latest
```

#### AWS S3
The service uses AWS S3 for storing media on cloud storage

There is a local service that mocks S3 however i didn't try it in development, feel free to try [Fake S3](https://hub.docker.com/r/lphoward/fake-s3/) and update this document

### Service configurations
You need to set you local configurations in a .env file

```sh
# Clone sample.env into .env file
$ cp sample.env .env
# Set your local configurations and source .env
$ set -a; source .env; set +a
```

### Start the service

#### Using [yarn](https://yarnpkg.com/en/)
```sh
# Install project dependencies
$ yarn
# To start the http service
$ yarn start
# To start the service worker
$ yarn start:worker
```

#### Using docker
```sh
# Build docker image
$ docker build -t vn-service --build-arg RELEASE=v1 ./
# Run the http service in a container
$ docker run -d --name vn --env-file .env -p 8080:8080 vn-service yarn start
# Run the service worker in a container
$ docker run -d --name vn-worker --env-file .env vn-service yarn start:worker
```

Note that if you are going to use docker to run the service you might want to use docker compose or run the service in host mode or create a docker network

## Documentation

Run this command to view service docs in browser
```sh
$ yarn serve:docs
```

### API documentation

The service API is documented under /docs using OpenAPI specification

To view the API docs using swagger ui using docker
```sh
# pull swagger ui image
$ docker pull swaggerapi/swagger-ui
# run container to view the service docs on localhost:9090
$ docker run -p 9090:8080 -e SWAGGER_JSON=/mnt/docs/openapi.yaml -v "$(pwd):/mnt" swaggerapi/swagger-ui
```

### Code documentation

The service follows [JSDOC](https://jsdoc.app/) inline code documentation spec and uses [documentationJS](https://documentation.js.org/) to compile the code documentation to Markdown

To update the code docs
```sh
$ yarn generate:docs:inline:md
```

## Development

### Code style

The project follows [StandardJS](https://standardjs.com/) style guide and uses it for code linting and formatting

To check for linting errors
```sh
$ yarn lint
# To fix common linting issues automatically
$ yarn lint --fix
```

### Testing

The project uses [mocha](https://mochajs.org/) for running tests and [chai](https://www.chaijs.com/) as the assertion library

```sh
# source test environment variables to shell
$ set -a; source test.env; set +a;
# run tests
$ yarn test
```

## TODO

List of things to do before going to production:

- Integrate with Sentry
- Integrate with Metric services like newrelic

## License

Not Specified