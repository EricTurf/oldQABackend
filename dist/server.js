'use strict';

/**
 * http://usejsdoc.org/
 */
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var api = require('./app/api');
var jwt = require('jsonwebtoken');
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

app.put('/createUser', api.createUser);
app.post('/api/activateUser/:token', api.validateUser);
app.get('/question', api.getQuestions);
app.put('/addQ', api.addQuestion);
app.post('/compileAnswers/:fname/:lname/:refID', api.compileAnswers);
app.delete('/delQ/:id', api.deleteQuestions);
app.post('/api/login', api.authUser);
app.post('/getUserInfo', api.getUserInfo);
app.get('/*', function (req, res) {
  res.sendfile('public/app/views/index.html');
});

app.listen(process.env.PORT || 8080);
//# sourceMappingURL=server.js.map