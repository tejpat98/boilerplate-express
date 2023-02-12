let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config();

console.log("Hello World")

app.use(function(req, res, next){
    //Had to skip this one 6/12. FCC is broken, Try again maybe works later.
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(__dirname + "/public"));

app.get('/', function(req, res){
    absolutePath = __dirname + "/views/index.html"
    res.sendFile(absolutePath);
});

app.get('/json', function(req, res){
    msg = { "message":"Hello json" };
    msg_style=process.env.MESSAGE_STYLE;
    if(msg_style == "uppercase"){
        console.log(msg["message"] = msg["message"].toUpperCase());
    }
    res.json(msg)
})

app.get('/now', function(req, res, next){
    req.time = new Date().toString();
    next()
}, function(req, res, next){
    msg = { time: req.time }
    res.json(msg)
})
app.get('/:word/echo', function(req, res){
    msg = { echo: req.params['word'] }
    res.json(msg);
})

app.route('/name').get( function(req, res, next){
    let first = req.query['first'];
    let last = req.query['last'];
    let msg = { name: `${first} ${last}` };
    res.json(msg);
}).post(function(req, res){
    let first = req.body['first'];
    let last = req.body['last'];
    let msg = { name: `${first} ${last}` };
    res.json(msg)
})































 module.exports = app;
