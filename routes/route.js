const express = require('express');
const pug = require('pug');
const app = express();
const Photo = require('../models').Photo;

//homepage
app.get('/', (req,res) => {
  Photo.findAll()
    .then(data =>{
      //res.render the index view
      res.render('index',{data});
    })
    .catch(err =>{
      res.json({
        success: false,
        error: err
      });
    });
});

//new page
app.get('/gallery/new', (req,res) => {
  res.render('new',{});
});

app.post('/gallery/new', (req,res) => {
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

//postman
app.post('/gallery', (req,res) => {
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
app.get('/gallery/:id/edit', (req,res) =>{
  Photo.findById(req.params.id)
    .then(data => {
      res.render('edit',{
        link: data.dataValues.link});
    })
    .catch(err =>{
      res.json({
        success: false,
        error: err
      });
    });
});

app.post('/gallery/:id/edit', (req,res) =>{
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
});

//one page (detail page)
app.get('/gallery/:id',(req,res) => {
  Photo.findAll()
    .then(data => {
      let one = data.find(photo => {
        if(photo.dataValues.id === parseInt(req.params.id)) {
          return photo;
        }
      });
      res.render('one',{
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

});

//postman
app.put('/gallery/:id', (req,res) => {
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
});

app.delete('/gallery/:id', (req,res) => {
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

module.exports = app;