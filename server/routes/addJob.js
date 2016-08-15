var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();

router.post('/', function(req, res){
  console.log(req.body);
  pg.connect(connection, function(err, client, done){
    var query = client.query('INSERT INTO jobs (company, title, date) VALUES ($1, $2, $3)', [req.body.company, req.body.title, req.body.date]);

    if(err){
      console.log(err);
    }
  });
});

router.get('/', function(req, res){
  console.log('in get');
  pg.connect(connection, function(err, client, done){
    var resutls = [];
    var query = client.query('SELECT * FROM jobs');
    query.on('row', function(row){
      results.push(row);
    });
    query.on('end', function(){
			done();
			res.send(results);
    });
    console.log('results', results);
  });
});

module.exports = router;
