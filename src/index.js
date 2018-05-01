/**
 * Copyright (c) 2016, Lee Byron
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bodyParser = require('body-parser');
const compression = require('compression');

const express = require('./asyncExpress');
// const renderView = require('./renderView');

const app = express();

app.use(compression());
app.use(express.static(__dirname + '/../static', { maxAge: 3600 }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.render('index.html.ejs');
});

app.get('/full', (request, response) => {
  return response.redirect(303, '/');
});

// 404
app.use((request, response, next) => {
  response.status(404);
  response.render('index.html.ejs', {
    message: 'Whoa! Check your browser address bar'
  });
});

// 500
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500);
  response.render('index.html.ejs', {
    message: 'Whoa! Something went wrong, could you let us know?'
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Running: http://localhost:' + port);
});
