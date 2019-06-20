var express		= require('express');
var path		= require('path');
var bodyParser  = require('body-parser');
var request		= require('request');
var app			= express();

var index 		= require('./routes/index');
var stations	= require('./routes/stations');
var station	= require('./routes/station');
var trips	= require('./routes/trips');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', index);
app.use('/stations', stations);
app.use('/station', station);
app.use('/trips', trips);


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("app listening at", host, port)
})




