const StringBinding = require('sharedb-string-binding');
const connection = require('./connection');

var code = connection.get('codepad', codeId);

console.log(code);
function subscribeToChanges(doc) {
  doc.subscribe(function(err) {
    if (err) throw err;
    var element = document.querySelector('textarea');
    var binding = new StringBinding(element, doc);
    binding.setup();
  });
}

subscribeToChanges(code);
