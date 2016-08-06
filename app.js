var express = require('express');
var app = express();
var path = require('path');
var hp = require('./header-parser');
var port = process.env.PORT || 3000;

// Middleware for static files
app.use(express.static(path.join(__dirname, "public")));

// matches '/' and '/index.html'
app.get('/', function(req, res) {
  res.render('index.html');
});

// all other urls are api endpoints
app.get('*', function(req, res) {
  var output = {};

  var ip = hp.parseIP(req);
  if (ip !== null) {
    output["ipAddress"] = ip;
  }

  var os = hp.parseOS(req.headers['user-agent']);
  if (os !== null) {
    output["operatingSystem"] = os;
  }

  var lang = hp.parseLang(req.headers['accept-language']);
  if (lang !== null) {
    output["language"] = lang;
  }

  res.json(output);
});

app.listen(port, function(err, res) {
  if (err) {
    console.log('Error happened during server startup:', err);
  }
  else {
    console.log('Server started successfully');
  }
});