var express = require('express');
var path = require('path');
var pg = require('pg');
var moment = require('moment');

var connection = require('../modules/connection');
var router = express.Router();

//Inserts jobs into the database.
router.post('/', function(req, res){
  console.log(req.body);
  pg.connect(connection, function(err, client, done){
    var query = client.query('INSERT INTO jobs6 (company, title, date, status, followed_up) VALUES ($1, $2, $3, $4, $5)', [req.body.company, req.body.title, req.body.date, req.body.status, req.body.followed_up]);

    if(err){
      console.log(err);
    }
  });
});

router.get('/', function(req, res){
  console.log('in get');
  pg.connect(connection, function(err, client, done){
    var results = [];
    var query = client.query('SELECT * FROM jobs6 ORDER BY id');
    query.on('row', function(row){
      if(row.company !== null){
        results.push(row);
      }
    });
    query.on('end', function(){
			done();
			res.send(results);
    });
    console.log('results', results);
  });
});

//Selects the jobs from the database.
router.get('/loadJobs', function(req, res){
  console.log('in get');
  pg.connect(connection, function(err, client, done){
    var results = [];
    var query = client.query('SELECT * FROM jobs6 ORDER BY id');
    query.on('row', function(row){
      // row.date.moment().format();
      if(row.company !== null){
        results.push(row);
       }
    });
    query.on('end', function(){
			done();
			res.send(results);
    });
    console.log('results', results);
  });
});

module.exports = router;
