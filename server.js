var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var route = require('./routes/route.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use('/',route);

app.set('view engine','pug');
app.set('views','./views');


var db = require('./models');

app.listen(8080, function() {
  console.log('server started');
  db.sequelize.sync();
});

module.exports = db;