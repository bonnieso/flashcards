var express = require('express');
var bodyParser = require('body-parser');

//data object to be replaced by database
var data = {};

//express.static allows us to statically host html, css, and js files in a folder
express()
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.json())
  .get('/api/data', (req, res) => res.json(data)) //post is where we would usually do our validation
  .post('/api/data', (req, res) => res.json(data = req.body)) //evaluates to whatever the variable is
  .get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))
  .listen(3333);

//now instead of npm run server, we can just call node server.
