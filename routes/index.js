var express = require('express');
var router = express.Router();
require('dotenv').config();
var knex = require('../db/knex');

/* GET home page. */
router.get('/packers', function(req, res, next) {
  knex('packers')
  .then(function(data) {
    res.render('index', { allData: data});
  });
});

router.get('/packers/:id', function(req, res, next) {
  knex('packers')
  .where('id', req.params.id)
  .then(function(data) {
    res.render('showpost', { allData: data});
  });
});

router.post('/packers', function(req, res, next) {
  if (req.body.name.trim().length > 0 && req.body.comment.trim().length > 0 && req.body.email.indexOf('@') != -1){
    if (req.body.name.trim().length < 15 && req.body.comment.trim().length < 50) {
      req.body.date = new Date();
      knex('packers')
      .insert(req.body)
      .returning('id')
      .then(function(id) {
        res.redirect('/packers/' + id);
      });
    }
    else{
      res.redirect('/packers');
    }
  }
  else{
    res.redirect('/packers');
  }
});

router.put('/packers/:id', function(req, res, next) {
  if (req.body.name.trim().length > 0 && req.body.comment.trim().length > 0 && req.body.email.indexOf('@') != -1){
    if (req.body.name.trim().length < 15 && req.body.comment.trim().length < 50) {
      knex('packers')
      .where('id', req.params.id)
      .update({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        date: new Date()
      })
      .returning('id')
      .then(function(id){
        res.redirect('/packers/' + id);
      });
    }
  }
});

router.delete('/packers/:id', function(req, res, next) {
  knex('packers')
  .where('id', req.params.id)
  .del()
  .then(function() {
    res.redirect('/packers');
  });
});


module.exports = router;
