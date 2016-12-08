var StringBinding = require('sharedb-string-binding');
var connection = require('./connection');
var id = window.location.pathname.substring(6);

var doc = connection.get('gists', id);

function subscribeToChanges(doc) {
  doc.subscribe(function(err) {
    if (err) throw err;
    var element = document.querySelector('textarea');
    var binding = new StringBinding(element, doc); 
    binding.setup();
  });
}

subscribeToChanges(doc);
