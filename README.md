# source-koa
## Running the server
```sh
yarn start
```
## Development
We use nodemon to autorestart the server when changes are made.
```sh
yarn dev
```

## Client
We use `browserify` to bundle the client js files.
```sh
yarn bundle
```

To auto-rebuild the client files, we use `watchify`.

```sh
yarn bundle:watch
```

Then open `http://localhost:3000`
