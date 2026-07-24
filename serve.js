var h = require('http');
var f = require('fs');
var p = require('path');
h.createServer(function(req, res) {
  var file = p.join('.' + (req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0]));
  try {
    var ext = p.extname(file);
    var types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
    var ct = types[ext] || 'text/plain';
    res.writeHead(200, {'Content-Type': ct + ';charset=utf-8'});
    res.end(f.readFileSync(file));
  } catch(e) {
    res.writeHead(404);
    res.end('Not found: ' + file);
  }
}).listen(8000, function() { console.log('http://localhost:8000'); });
