const express = require('express');
const pug = require('pug');
const app = express();
const Photo = require('../models').Photo;


app.get('/', (req,res) => {
  Photo.findAll()
    .then(data =>{
      //res.render the index view
      res.render('index',{data})
    })
})

app.get('/gallery/:id',(req,res) => {
  Photo.findById(req.params.id)
    .then(data => {
      //res.render the single photo view
      res.json({data})
    })
})

app.get('/gallery/new', (req,res) => {
  res.render('new',{
    data: 'something'
  })
})

app.post('/gallery/new', (req,res) => {
  Photo.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
    .then(done => {
      res.json({success:true});
    })
})

app.post('/gallery', (req,res) => {
  Photo.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
    .then(done => {
      res.json({success:true});
    })
})

app.get('/gallery/:id/edit', (req,res) =>{
  Photo.findById(req.params.id)
    .then(data => {
      //render edit view
      res.json({data})
    })
})

app.post('/gallery/:id/edit', (req,res) =>{
  Photo.findById(req.params.id)
    .then(data => {
      data.update({
        author: req.body.author,
        link: req.body.link,
        description: req.body.description
      })
      .then(done => {
        res.json({success: true})
      })
    })
})

app.put('/gallery/:id', (req,res) => {
  Photo.findById(req.params.id)
    .then(data => {
      data.update({
        author: req.body.author,
        link: req.body.link,
        description: req.body.description
      })
      .then(done => {
        res.json({success: true})
      })
    })
})


app.delete('/gallery/:id', (req,res) => {
  Photo.findById(req.params.id)
    .then(data => {
      data.destroy();
    })
    .then(done => {
      res.json({success:true})
    })
})

module.exports = app;