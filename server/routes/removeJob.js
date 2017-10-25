var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();

//deletes the job from the database.
router.post('/', function(req, res){
  console.log(req.body);
  pg.connect(connection, function(err, client, done){
    client.query('DELETE FROM jobs6 WHERE id = ' + [req.body.id]);
  });
});

module.exports = router;
