const Photo = require('../models').Photo;


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

const isAuthenticated = (req, res, next) => {
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  return next();
};

module.exports = {
  editValidation,
  newValidation,
  isAuthenticated
}