/* External files to be accesed by the server.js */

var express = require('express');
// Express router for routing
var router = express.Router();

router.get('/', function(req, res){
    res.send('GET route on externalThings.');
});
router.post('/', function(req, res){
    res.send('POST route on externalThings.');
});

//export this router to use in our server.js
module.exports = router;