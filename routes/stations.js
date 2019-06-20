var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/', function(req, res, next) {
    request.get('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y', function(error, response, body) {
	res.send(body);
    });
});

module.exports = router;




