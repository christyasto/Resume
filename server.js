var express = require('express');
var cors = require('cors');
var path = require('path');

var app = express();

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    const skills = [
        {}
    ];
    const workexp = [
        {}
    ];
    const compet = [
        {}
    ];
    res.render('index', { skills, workexp, compet });
})

app.listen(8000, function() {
    console.log("heard on 8000");
})