var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/', function(req, res, next) {
    var source = req.query.source;
    if (!req.query.source) {
	res.send('{ "error" : "Missing source" }');
	return;
    }
    request.get('http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=' + source + '&key=MW9S-E7SL-26DU-VV8V&json=y', function(error, response, body) {
	res.send(JSON.parse(body));
    });
});

module.exports = router;
