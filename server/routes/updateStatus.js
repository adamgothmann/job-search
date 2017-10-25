var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();

//updates the job status in the database.
router.post('/', function(req,res){
  console.log(req.body);
  pg.connect(connection, function(err, client, done){
    console.log('in updateStatus');
    client.query('UPDATE jobs6 SET status = ($1) WHERE id = ($2)', [ req.body.status, req.body.id ] );
  });
});

module.exports = router;
