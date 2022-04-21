var express = require('express');
var path = require('path');
const mysql = require('mysql');

const fs = require('fs')
var data = fs.readFileSync('credentials.txt', 'utf8').split(',');
var host = data[0], user = data[1], pass = data[2], db = data[3];

var app = express();

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

var connection;
function handleDisconnect() {
    // Connection Details
    connection = mysql.createConnection({
        host: host,
        user: user,
        password: pass,
        database: db,
        multipleStatements: true
    })
    connection.connect(function (err) {                 // The server is either down
        if (err) {                                      // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);         // We introduce a delay before attempting to reconnect,
        }                                               // to avoid a hot loop, and to allow our node script to
    });                                                 // process asynchronous requests in the meantime.

    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {  // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                        // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    })
}

handleDisconnect();
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