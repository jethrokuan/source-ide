'use strict';

const url = require('url'),
      compose = require('koa-compose'),
      co = require('co'),
ws = require('ws');
const WebSocketServer = ws.Server;
const debug = require('debug')('koa:websockets');
import backend from './db';
import WebSocketJSONStream from 'websocket-json-stream';

function KoaWebSocketServer (app) {
  this.app = app;
  this.middleware = [];
}

KoaWebSocketServer.prototype.listen = function (server) {
  this.server = new WebSocketServer({
    server: server
  });
  this.server.on('connection', this.onConnection.bind(this));
};

KoaWebSocketServer.prototype.onConnection = function(socket) {
  debug('Connection received');
  const stream = new WebSocketJSONStream(socket);
  backend.listen(stream);
  socket.on('error', function (err) {
    debug('Error occurred:', err);
  });
  const fn = co.wrap(compose(this.middleware));

  const context = this.app.createContext(socket.upgradeReq);
  context.websocket = socket;
  context.path = url.parse(socket.upgradeReq.url).pathname;

  fn(context).catch(function(err) {
    debug(err);
  });
};

KoaWebSocketServer.prototype.use = function (fn) {
  this.middleware.push(fn);
  return this;
};

// function MyWebSocketServer(app) {
//   KoaWebSocketServer.call(this);
// }

// MyWebSocketServer.prototype = new KoaWebSocketServer();

// MyWebSocketServer.prototype.onConnection = function(socket) {
//   console.log("connected");
//   const stream = new WebSocketJSONStream(socket);
//   backend.listen(stream);
//   KoaWebSocketServer.prototype.onConnection.call(this);
// }

module.exports = function (app) {
  const oldListen = app.listen;
  app.listen = function () {
    debug('Attaching server...');
    app.server = oldListen.apply(app, arguments);
    app.ws.listen(app.server);
    return app.server;
  };
  app.ws = new KoaWebSocketServer(app);
  return app;
};
