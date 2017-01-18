const StringBinding = require('sharedb-string-binding');
const connection = require('./connection');

var code = connection.get('codepad', codeId);

function subscribeToChanges(doc) {
  doc.subscribe(function(err) {
    if (err) throw err;
    var element = document.querySelector('textarea');
    var binding = new StringBinding(element, doc);
    doc.on('op', function(op, source) {
      var node = document.createElement("LI");
      var textnode = document.createTextNode(JSON.stringify(op)); 
      node.appendChild(textnode);
      document.getElementById("logs").appendChild(node);
      console.log(op);
    });
    binding.setup();
  });
}

subscribeToChanges(code);
