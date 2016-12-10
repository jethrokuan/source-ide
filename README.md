# source-koa

## Stack
  * Node 7.2.0
  * Yarn (package management)
  * Babel (for transpilation
  * Koa 2 (web server)
  * Passport (Authentication)
  * ShareDB (OT Library)
  * MongoDB (Session store, and persistence layer for ShareDB)
        
## Installation
To ensure a consistent development environment, we use [Vagrant](https://www.vagrantup.com).

The repository comes with a `Vagrantfile`, that sets up node, yarn and mongo in an Ubuntu trusty VM.

Simply install Vagrant, and run: 
```sh
vagrant up
```

The server is port-forwarded to port `8080` on `localhost`, and can be accessed at `localhost:8080`.

## VM-less Installation
Sometimes, running an additional VM can be slow, in which case provisioning a working environment is left to the user.

### Running the server
```sh
yarn start
```

### Development
We use `nodemon` to restart the server when changes are made.
```sh
yarn dev
```

### Client
We use `browserify` to bundle the client js files.
```sh
yarn bundle
```

To auto-rebuild the client files, we use `watchify`.

```sh
yarn bundle:watch
```

## Development
### eslint
A consistent Javascript code style is ensured with eslint. Please make sure there are no errors before pushing up to master. (Warnings are fine; usually they are uses of `console.log`).

Run eslint with:
```sh
yarn lint
```

Then open `http://localhost:3000`
