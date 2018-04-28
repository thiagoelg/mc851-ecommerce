var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;

app.listen(port);

console.log('RESTful API server started');

app.get('/', (req, res) => {
  res.send('Hello world\n');
});