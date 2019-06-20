var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/', function(req, res, next) {
    var source = req.query.source;
    var dest = req.query.dest;
    if (!req.query.source) {
	res.send('{ "error" : "Missing source" }');
	return;
    }
    request.get('http://api.bart.gov/api/sched.aspx?cmd=depart&orig=' + source + '&dest=' + dest + '&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1&json=y', function(error, response, body) {
	
    res.send(body);

 		
    });
});

module.exports = router;





	    
