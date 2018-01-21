/**
 * http://usejsdoc.org/
 */

import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import router from './routes/router';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.json({
    type: 'application/vnd.api+json'
  })
);
app.use('/api', router);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8080);
