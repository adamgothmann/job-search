var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(bodyParser.json());
app.use(express.static('public'));

app.get( '/', function( req, res ){
  console.log('in base url');
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('on port', app.get('port'));
});

var addJob = require('../server/routes/addJob');

app.use('/addJob', addJob);
