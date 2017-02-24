var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();

router.post('/', function(req, res){
  console.log(req.body);
  pg.connect(connection, function(err, client, done){
    client.query('UPDATE jobs3 SET followed_up = true WHERE id = ($1)', [req.body.index]);
  });
});

module.exports = router;
