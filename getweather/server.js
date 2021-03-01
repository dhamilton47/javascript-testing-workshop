const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

const server = app.listen(port);

/*
const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
*/
module.exports = {app, server};