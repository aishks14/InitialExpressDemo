// main server.js file
// -------------------------- MODULES ------------------------------------------------------------
// Core Modules
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var http = require('http');
var fs = require('fs');

// Local Modules
var externalThings = require('./externalThings.js'); // External module
// -----------------------------------------------------------------------------------------------

// -------------------------- INVOLVING PUG ------------------------------------------------------

app.set('view engine', 'pug'); // Telling that view engine used is pug
app.set('views','./views'); // Telling that views will be available inside views folder

// -----------------------------------------------------------------------------------------------

// -------------------------- STATIC FILE REFERENCE ----------------------------------------------

app.use(express.static('public')); // Static file directory

// -----------------------------------------------------------------------------------------------

// -------------------------- FILE OPERATION MODULES ----------------------------------------------

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());

// -----------------------------------------------------------------------------------------------

// -------------------------- HTTP METHODS -------------------------------------------------------

// Rendering the form data
app.get('/', (req, res) => {
    res.render('form', {
        title: "PUG FORM"
    });
});

// Rendering page using PUG engine
app.get('/home', (req, res) => {
    res.render('index', {
        name: "PUGWORLD",
        url: "https://www.tutorialspoint.com/expressjs/expressjs_templating.htm"
    });
});

// Rendering pages
// Get Request
app.get('/hello', function (req, res) {
    res.send("Hello world!");
});

// Middleware function to log request protocol
app.use('/externalThings', function(req, res, next){
    console.log("A request for external things received at " + new Date(Date.now()));
    next();
});

// Post request
app.post('/hello', function (req, res) {
    res.send("You just called the post method at '/hello'!\n");
});

// This method is basically used to define the middleware
// This all method is used to handle all types of http methods
app.all('/test', function (req, res) {
    res.send("HTTP method doesn't have any effect on this route!");
});

// Dynamic routes - The id will come from the URL where the id is present as a URL parameter
app.get('/:id', function (req, res) {
    res.send('The id you specified is ' + req.params.id);
});

// Complex dynamic routes - The ID and name will come from the URL
app.get('/externalThings/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

// Regular expressions - if needed for a route
// In this case id must be betweeen 0 to 9 and must be 5 digits long
app.get('/externalThings/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
});

// Post Form Request
app.post('/', function(req, res){
    console.log(req.body);
    res.send("recieved your request!");
});

// -----------------------------------------------------------------------------------------------

// -------------------------- READING FILE -------------------------------------------------------

function onRequest(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(err, data){
        if (err){
            res.writeHead(404);
            res.write('File Not Found');
        } else {
            res.write(data);
        }
        res.end();
    });
}

// -----------------------------------------------------------------------------------------------


// --------------------------- RENDERING LOCAL MODULES -------------------------------------------

// Both server.js and externalThings.js should be in same directory
app.use('/externalThings', externalThings);

// -----------------------------------------------------------------------------------------------

// --------------------------------------- MIDDLEWARES -------------------------------------------

//Simple request time logger
app.use(function(req, res, next){
    console.log("A new request received at " + Date.now());

    // This function call is very important. It tells that more processing is
    // required for the current request and is in the next middleware
    // function route handler.
    next();
});

// -----------------------------------------------------------------------------------------------


// --------------------------------------- WHEN NO ROUTE IS FOUND --------------------------------

// Routes which are not found are placed here
// This must be kept after all the routes
app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

// -----------------------------------------------------------------------------------------------

// ------------------------------------ LISTENING TO SERVER PORT ---------------------------------

// Listening to the server
// http.createServer(onRequest).listen(9000);
app.listen(9000);

// -----------------------------------------------------------------------------------------------