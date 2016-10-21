const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const passport = require('passport');
const LocalStrategy = require ('passport-local');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const db = require('./models');
const config = require('./config/config.json');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));

app.set('view engine','pug');
app.set('views','./views');

app.use(session({
  store: new RedisStore(),
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy ((username, password, done)=>{
  db.User.findOne({
    where: {
      username
    }
  })
  .then((user)=>{
    if(user === null) {
      return done(null,false);
    } else {
      const isAuthenticated =(username === user.username && password === user.password);
      if(!isAuthenticated){
        return done(null, false);
      } else {
        return done(null, user);
      }
    }
  });
}));

passport.serializeUser((user, done)=> {
  return done(null, user);
});

passport.deserializeUser((user, done)=>{
  return done(null, user);
});

app.use('/',route);

app.listen(8080, function() {
  console.log('server started');
  db.sequelize.sync()
    .catch(err =>{
      res.json({
        testing: 'here',
        success: false,
        error: err
      });
    });
});

