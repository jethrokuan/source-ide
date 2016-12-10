// Generic Deps
import path from 'path';

// Koa Deps
import Koa from 'koa';
import websockify from 'koa-websocket';
import WebSocketJSONStream from 'websocket-json-stream';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-generic-session';
import MongoStore from 'koa-generic-session-mongo';
import views from 'koa-views';
import convert from 'koa-convert';
import serve from 'koa-static';

import nunjucks from 'nunjucks';

// Auth
import passport from 'koa-passport';

// Middleware
import finalHandler from './lib/middlewares/finalHandler';

// Routes
import * as routes from './routes';

// DB
import backend from './db';

const app = websockify(new Koa(), {
  onConnection: (socket) => {
    const stream = new WebSocketJSONStream(socket);
    backend.listen(stream);
  },
});

app.use(finalHandler());

app.use(views(path.join(__dirname, 'views'), {
  extension: 'njk',
  map: {
    njk: 'nunjucks',
  },
}));

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
});

app.use(logger());
app.use(bodyParser());

// Session
app.keys = ['some secret hurr'];
app.use(convert(session({
  store: new MongoStore(),
})));

// Auth
require('./auth');

app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(serve(path.join(__dirname, 'public')));

// Routes setup
Object.values(routes).forEach((route) => {
  app.use(route.routes())
    .use(route.allowedMethods());
});

export default app;
