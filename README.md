# Angular2-Playground

## Prerequisites & dependencies

```
Docker
npm >= 6.0
@angular/cli >= 6.1.2
````

## Download and install

- Clone this repo: `git clone ${THIS_REPO}`
- Install dependencies: `cd ${THIS_REPO} && npm install`
- Build docker image: `docker build --tag ${DOCKER_TAG} .`
- Check docker image has been correctly installed: 
```
> docker images | grep ${DOCKER_TAG} | wc -l`
> 1
```

## Run on host

```
> cd ${REPO_PATH}
> ng serve --open
```

## Run on docker

```
host> cd ${REPO_PATH}
host> docker run -it --volume=$(pwd):/usr/src/app --publish 4200:4200 angular bash
docker> ng serve --host=0.0.0.0
```

App will be available in host at `localhost:4200`.

## Tests

Tests currently does not work in the docker container. 

### Unit tests

Unit tests uses [Karma](https://karma-runner.github.io).

```
> cd ${REPO_PATH}
> ng test --watch=false
```

Removing `--watch=false` will open a browser tab with details about the tests.

### End-to-end tests

End-to-end tests uses [Protractor](http://www.protractortest.org/).

```
> cd ${REPO_PATH}
> ng e2e
```

## MISC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
