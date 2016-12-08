import Router from 'koa-router';
import backend from '../db';
import WebSocketJSONStream from 'websocket-json-stream';

const router = new Router();

router.all('/', async ctx => {
  ctx.websocket.on('connection', function(ws, req){
    console.log("connected");
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });
});

export default router;
