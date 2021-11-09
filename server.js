var express = require('express');
var path = require('path');
const mysql = require('mysql');

var app = express();

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

// Connection Details
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-01.cleardb.com',
    user: 'b59c6fb590b2f5',
    password: 'b99ceae5',
    database: 'heroku_a191ac8198c99b6',
    multipleStatements: true
})

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Render Home Page
app.get('/', function (req, res) {
    const compet = [
        { name: "Founder’s Memorial", com: "National Heritage Board Singapore", period: "April 2019", pos: "" },
        { name: "Pesona Lomba Desain Shelter", com: "Kemenpar Indonesia", period: "August 2018", pos: "" },
        { name: "TATA Customer Service Centre Design", com: "TATA Consultancy Services Singapore", period: "March 2017", pos: "1st Place" },
        { name: "eVolo Skyscraper Competition", com: "eVolo magazine", period: "February 2017", pos: "" },
        { name: "ISTD Receptionist Design", com: "SUTD", period: "February 2017", pos: "2nd Place" },
        { name: "BCA Productivity Challenge", com: "BCA Academy Singapore", period: "September 2016", pos: "" },
        { name: "International BIM Competition", com: "BCA Academy Singapore", period: "September 2016", pos: "" }
    ];

    connection.query('SELECT * FROM skills; SELECT * FROM experience; SELECT * FROM jobscope; SELECT * FROM competitions;', [1, 2, 3, 4], (error, results) => {
        if (error) throw error;
        if (!error) {
            let skills = results[0];
            let workexp = results[1];
            let jobscope = results[2];
            let compet = results[3];
            res.render('index', { skills, workexp, jobscope, compet });
        }
    })

})

app.listen(port)
console.log(`Heard on port ${port}`);