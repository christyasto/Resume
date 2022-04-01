var express = require('express');
var path = require('path');
const mysql = require('mysql');

const fs = require('fs')
var data = fs.readFileSync('credentials.txt', 'utf8').split(',');
var host = data[0], user = data[1], pass = data[2], db = data[3];

var app = express();

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

// Connection Details
const connection = mysql.createConnection({
    host: host,
    user: user,
    password: pass,
    database: db,
    multipleStatements: true
})

// Force mysql to keep connection alive every 3 hours
setInterval(function () {
    connection.query('SELECT 1');
    console.log("tick");
}, 1 * 3600 * 1000);

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Render Home Page
app.get('/', function (req, res) {
    connection.query('SELECT * FROM skills; SELECT * FROM experience; SELECT * FROM jobscope; SELECT * FROM competitions;', [1, 2, 3, 4], (error, results) => {
        if (error) throw error;
        if (!error) {
            let skills = results[0];
            let workexp = results[1].slice().reverse();
            let jobscope = results[2].slice().reverse();
            let compet = results[3].slice().reverse();
            res.render('index', { skills, workexp, jobscope, compet });
        }
    })
})

app.listen(port)
console.log(`Heard on port ${port}`);