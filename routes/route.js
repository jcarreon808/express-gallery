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
    });
});

//edit page
app.get('/gallery/:id/edit', (req,res) =>{
  Photo.findById(req.params.id)
    .then(data => {
      res.render('edit',{
        link: data.dataValues.link});
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
      });
    });
});

//one page (detail page)
app.get('/gallery/:id',(req,res) => {
  Photo.findAll()
    .then(data => {
      let one = data.find(photo => {
        if(photo.dataValues.id === parseInt(req.params.id)) {
          return photo
        }
      })
      console.log('the title',one.dataValues)
      res.render('one',{
        one: one.dataValues,
        all: data
      });
    })

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
    });
});

module.exports = app;