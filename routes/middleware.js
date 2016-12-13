const Photo = require('../models').Photo;
const User = require('../models').User;
const bcrypt =  require('bcrypt-nodejs');
const passport = require('passport');


function editValidation(req, res, next) {
  Photo.findById(req.params.id)
    .then(photo => {
      if (req.body.title === '') {
        req.body.title = photo.dataValues.title;
      }

      if (req.body.author === '') {
        req.body.author = photo.dataValues.author;
      }

      if (req.body.link === '') {
        req.body.link = photo.dataValues.link;
      }

      if (req.body.description === '') {
        req.body.description = photo.dataValues.description;
      }

      next();
    })
    .catch(err => {
      res.json({
        success: false,
        error: err
      });
    })
}

function newValidation(req,res,next) {
  if(req.body.title === '' ||
    req.body.author === '' ||
    req.body.link === '' ||
    req.body.description === '') {
      req.flash('error','Please fill out all fields')
      req.body.errored = true;
      next();
  } else {
    next();
  }
}

const authentication = (req, res, next) => {
  if(!req.isAuthenticated()){
    res.redirect('/login');
  } else {
    return next();
  }
};

function username(req,res,next) {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if (user === null) {
      if (req.body.username.length > 5 && req.body.password.length > 5) {
        bcrypt.genSalt((err,salt)=>{
          if(err){
            console.error(err);
          }
          bcrypt.hash(req.body.password, salt, (err,hash)=>{
            if(err){
              console.error(err);
            }
            req.body.password = hash;
            next();
          });
        });
      } else {
        req.flash('error', 'Username and password must be at least 6 characters')
        req.body.errored = true;
        next();
      }
    } else {
      req.flash('error','Username is already in use')
      req.body.errored = true;
      next();
    }
  })
  .catch(err => {
    res.json({
      success: false,
      error: err
    });
  });
}

function owner(req,res,next) {
  User.findOne({
    where: {
      username: req.user.username
    }
  })
  .then(user => {
    Photo.findById(req.params.id)
      .then(photo => {
        if(photo.userId === user.id) {
          next();
        } else {
          res.render('./photos/message',{
            notOwner: photo.id
          });
        }
      })
      .catch(err => {
        res.json({
          success: false,
          error: err
        })
      });
    })
    .catch(err => {
      res.json({
        success: false,
        error: err
      });
    });
}

function password(req,res,next) {
  if (req.body.confirmPassword === req.body.password) {
    next();
  } else {
    req.flash('error','passwords do not match')
    req.body.errored = true;
    next();
  }
}

function flashError(msg,origin) {
  return passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: origin,
    failureFlash: msg
  })
}

module.exports = {
  editValidation,
  newValidation,
  authentication,
  username,
  owner,
  password,
  flashError
}