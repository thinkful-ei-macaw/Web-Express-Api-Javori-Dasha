const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  const a = req.query.a
  const b = req.query.b
  const responseText = `The sum of ${a} and ${b} is ${req.query.a + req.query.b}`;
  res.send(responseText);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});