const Photo = require('../models').Photo;
const User = require('../models').User;
const bcrypt =  require('bcrypt');

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
      res.json({
        success: false,
        error: '400 - Bad Request: Please enter text in all fields'
      })
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
        res.registerError = "Username and Password must be at least 6 characters"
        //passport


        res.redirect('/register')
      }
    } else {
      req.registerError = "Username already in use"
      //passport


      res.redirect('/register');
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
    res.redirect('/register');
  }
}

module.exports = {
  editValidation,
  newValidation,
  authentication,
  username,
  owner,
  password
}