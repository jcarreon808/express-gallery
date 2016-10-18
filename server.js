var express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));

var db = require('./models');

app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});

