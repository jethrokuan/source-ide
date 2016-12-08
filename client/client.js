var StringBinding = require('sharedb-string-binding');
var connection = require('./connection');

// Create local Doc instance mapped to 'examples' collection document with id 'textarea'
var doc = connection.get('examples', 'textarea');

function createIfNeeded(doc,callback) {
  if (doc.type === null) {
    console.log("creating document");
    doc.create("hello", callback);
    return;
  }
}

function subscribeToChanges(doc) {
  return function() {
    doc.subscribe(function(err) {
      if (err) throw err;
      var element = document.querySelector('textarea');
      var binding = new StringBinding(element, doc); 
      binding.setup();
    });
  };
}

createIfNeeded(doc, subscribeToChanges(doc));
