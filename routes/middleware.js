const Photo = require('../models').Photo;


function editValidation(req, res, next) {
  Photo.findById(req.params.id)
    .then(photo => {
      console.log('photo',photo.dataValues);
      if (req.body.title = '') {
        req.body.title = photo.dataValues.title;
      }

      if (req.body.author = '') {
        req.body.author = photo.dataValues.author;
      }

      if (req.body.link = '') {
        req.body.link = photo.dataValues.link;
      }

      if (req.body.description = '') {
        req.body.description = photo.dataValues.description;
      }

      next();
    })
}

function newValidation(req,res,next) {

}


module.exports = {
  editValidation,
  newValidation
}