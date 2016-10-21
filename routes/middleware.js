const Photo = require('../models').Photo;
const User = require('../models').User;

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
        next();
      } else {
        res.json({
          success: false,
          error: "Username and Password must be at least 6 characters"
        })
      }
    } else {
      res.redirect('/create');
    }
  })
  .catch(err => {
    res.json({
      success: false,
      error: err
    });
  })
}

function owner(req,res,next) {
  User.findOne({
    where: {
      username: req.user.username
    }
  })
  .then(user => {
    console.log('req user',req.user);
    Photo.findById(req.params.id)
      .then(photo => {
        if(photo.userId === user.id) {
          next();
        } else {
          res.json({
            success: false,
            error: 'You are not the owner of this Photo'
          })
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

module.exports = {
  editValidation,
  newValidation,
  authentication,
  username,
  owner
}