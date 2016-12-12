var sharedb = require('sharedb/lib/client');
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

module.exports = connection;
