import Path from 'path';
import Koa from 'koa';
import websockify from 'koa-websocket';
import WebSocketJSONStream from 'websocket-json-stream';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import views from 'koa-views';
import convert from 'koa-convert';
import serve from 'koa-static';
import finalHandler from './lib/middlewares/finalHandler';
import router from './routes/router';
import wsRoutes from './routes/ws';

import backend from './db';

const app = websockify(new Koa(), {
  "onConnection": function(socket) {
    const stream = new WebSocketJSONStream(socket);
    backend.listen(stream);
  }
});

app.use(finalHandler());

app.use(views(`${__dirname}/views`, {
  map: {
    html: 'nunjucks',
  },
}));
app.use(logger());
app.use(bodyParser());
app.keys = ['some secret hurr'];
app.use(convert(session(app)));
app.use(serve(Path.join(__dirname, 'public')));
app.ws.use(wsRoutes.routes()).use(wsRoutes.allowedMethods());
app.use(router.routes())
  .use(router.allowedMethods());

export default app;
