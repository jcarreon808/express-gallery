 const express = require('express');
const pug = require('pug');
const gallery = express.Router();
const Photo = require('../models').Photo;
const User = require('../models').User;
const validate = require('./middleware.js');
const passport = require('passport');


//homepage
gallery.route('/')
  .get((req,res) => {
    Photo.findAll()
      .then(data =>{
        let one = data.slice(data.length-1)[0];
        console.log(one);
        res.render('./photos/index',{
          data,
          one
        });
      })
      .catch(err =>{
        res.json({
          testing: 'here',
          success: false,
          error: err
        });
      });
  });

//login page
gallery.route('/login')
  .get((req,res)=>{
    res.render('./users/login');
  })
  .post(passport.authenticate('local',{
    successRedirect :'/',
    failureRedirect :'/login',
  }));

//new page
gallery.route('/gallery/new')
  .get(validate.authentication, (req,res) => {
    res.render('./photos/new',{
      error: req.flash('error')
    });
  })
  .post(validate.newValidation, (req,res) => {
    if(req.body.errored) {
      res.redirect('/gallery/new');
    } else {
      Photo.create({
        title: req.body.title,
        author: req.body.author,
        link: req.body.link,
        description: req.body.description,
        userId: req.user.id
      })
      .then(done => {
        Photo.findAll()
          .then(data =>{
            let one = data.slice(data.length-1)[0];
            res.render('./photos/index',{
              data,
              one
            });
          })
          .catch(err =>{
            res.json({
              success: false,
              error: err
            });
          });
      })
      .catch(err =>{
        res.json({
          success: false,
          error: err
        });
      });
    }
  });

//postman
gallery.route('/gallery')
  .post(validate.newValidation, validate.owner, (req,res) => {
    Photo.create({
      title: req.body.title,
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
      .then(done => {
        res.json({success:true});
      })
      .catch(err =>{
        res.json({
          success: false,
          error: err
        });
      });
  });

//edit page
gallery.route('/gallery/:id/edit')
  .get(validate.authentication, validate.owner, (req,res) =>{
    Photo.findById(req.params.id)
      .then(data => {
        res.render('./photos/edit',{
          link: data.dataValues.link
        });
      })
      .catch(err =>{
        res.json({
          success: false,
          error: err
        });
      });
  })
  .post(validate.editValidation, validate.owner, (req,res) =>{
    Photo.findById(req.params.id)
      .then(data => {
        data.update({
          title: req.body.title,
          author: req.body.author,
          link: req.body.link,
          description: req.body.description
        })
        .then(done => {
          Photo.findAll()
          .then(data => {
            let one = data.find(photo => {
              if(photo.dataValues.id === parseInt(req.params.id)) {
                return photo;
              }
            });
            res.render('./photos/one',{
              one: one.dataValues,
              all: data
            });
          })
          .catch(err =>{
            res.json({
              success: false,
              error: err
            });
          });
        })
        .catch(err =>{
          res.json({
            success: false,
            error: err
          });
        });
      })
      .catch(err =>{
        res.json({
          success: false,
          error: err
        });
      });
  });

//one page (detail page)
gallery.route('/gallery/:id')
  .get(validate.authentication,(req,res) => {
    Photo.findAll()
      .then(data => {
        let one = data.find(photo => {
          if(photo.dataValues.id === parseInt(req.params.id)) {
            return photo;
          }
        });
        res.render('./photos/one',{
          one: one.dataValues,
          user: req.user.id,
          all: data
        });
      })
      .catch(err =>{
        res.json({
          success: false,
          error: err
        });
      });
  })
  .put(validate.editValidation, validate.owner, (req,res) => {
    Photo.findById(req.params.id)
      .then(data => {
        data.update({
          title: req.body.title,
          author: req.body.author,
          link: req.body.link,
          description: req.body.description
        })
        .then(done => {
          res.json({success: true});
        })
        .catch(err =>{
          res.json({
            success: false,
            error: err
          });
        });
      })
      .catch(err =>{
        res.json({
          success: false,
          error: err
        });
      });
  })
  .delete(validate.authentication, validate.owner, (req,res) => {
    Photo.findById(req.params.id)
      .then(data => {
        data.destroy();
      })
      .then(done => {
        res.json({success:true});
      })
      .catch(err =>{
        res.json({
          success: false,
          error: err
        });
      });
  });

gallery.route('/gallery/:id/delete')
  .get(validate.authentication, validate.owner,(req,res)=>{
    Photo.findById(req.params.id)
      .then(data => {
        data.destroy();
      })
      .then(done => {
        res.render('./photos/delete');
      })
      .catch(err =>{
        res.json({
          success: false,
          error: err
        });
      });
  })

gallery.route('/register')
  .get((req,res)=>{
      res.render('./users/register');
    })
  .post(validate.password, validate.username, (req,res) => {
    if (req.body.errored) {
      res.redirect('/register');
    } else {
      User.create({
        username: req.body.username,
        password: req.body.password,
      })
      .then(done => {
        res.render('./users/login');
      })
      .catch(err =>{
        res.json({
          success: false,
          error: err
        });
      });
    };
  });

gallery.route('/logout')
  .get((req, res)=>{
  req.logout();
  res.redirect('/login');
});

module.exports = gallery;