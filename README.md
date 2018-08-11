# Angular2-Playground ![Travis build](https://api.travis-ci.com/epsxy/angular2-playground.svg?branch=master)

## Prerequisites & dependencies

```
Docker
npm >= 6.0
@angular/cli >= 6.1.2
```

## Quickstart

You can simply start and run the project with:

```
git clone https://github.com/epsxy/angular2-playground
cd angular2-playground
npm run quickstart
```

The application will be available at `localhost:4242`

NB: The previous command will:
- Clone the repo
- Install node dependencies
- Build docker image
- Run docker image
- Run the angular app on host port 4242

## Install

2 types of install are supported: 
- Host: Clone the repository, install dependencies and run the application
- Docker: Use provided scripts to build and run the project inside a docker container

### Host

- Clone the repo: `git clone https://github.com/epsxy/angular2-playground`
- Install node dependencies: `npm install`
- Run the project on your host: `npm run start`

The application will be available at `localhost:4200`

### Docker

- Clone the repo: `git clone https://github.com/epsxy/angular2-playground`
- Install node dependencies: `npm install`
- Build docker container: `npm run docker:build`
- Check docker install state: `npm run docker:check` should return 1
- Run project in docker: `npm run docker:serve`

The application will be available at `localhost:4242`

## Tests

Tests can be runned in your host or in a docker container.

### Host

- Lint: `npm run lint`
- Unit tests: `npm run test`
- End to end tests: `npm run e2e`

### Docker
*End to end tests does not work inside a docker container at the moment. Probably because of an issue with Headless Chrome browser and `.sendKey()` method.*

Only `lint` and `unit test` will be executed.

```
npm run docker:test
```

## ISSUES

### Application

- *Issue for lower bound text fitting*. When the text is big enough, or the output box is small enough, new font size could not be computed. As we are considering integer font sizes, when a 1px sized text does not fit in the container, the new computed font needs to be 0px. Which is not suitable for this app. When this situation happens, the data is reset in the app: input is cleared and slider value returns to 100%.

### Integration

- *End-to-end tests does not work in Docker.* Probably because of Headless Chrome browser.
- *End-to-end tests does not work in Travis-CI.* Output element container height is thus always 35px instead of 50px. I do not know if it is related to Docker end-to-end tests issues.

## MISC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
