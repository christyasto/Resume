var express = require('express');
var cors = require('cors');
var path = require('path');
const mysql = require('mysql');

var app = express();

const port = process.env.PORT || 3000

app.use(cors());
app.use(express.static(__dirname + '/public'));

// Connection Details
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-01.cleardb.com',
    user: 'b59c6fb590b2f5',
    password: 'b99ceae5',
    database: 'heroku_a191ac8198c99b6'
})

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Render Home Page
app.get('/', function (req, res) {
    const skills = [
        [
            { skill: "C#", lvl: 8 },
            { skill: "HTML", lvl: 8 },
            { skill: "Java", lvl: 8 },
            { skill: "Python", lvl: 6 },
            { skill: "VBA", lvl: 4 },
            { skill: "MySQL", lvl: 2 }
        ],
        [
            { skill: "Rhinoceros", lvl: 10 },
            { skill: "Grasshopper", lvl: 10 },
            { skill: "AutoCAD", lvl: 8 },
            { skill: "Adobe Softwares", lvl: 8 }
        ],
        [
            { skill: "Word, Excel, Powerpoint", lvl: 8 },
            { skill: "Unity3D", lvl: 3 },
        ]

    ];
    const workexp = [
        { pos: "Research Officer", com: "SUTD International Design Centre", scope: ["Quick learning of new bio-material and analysis method (SEM)", "Prototyping & digital fabrication (3D print, laser-cut, CNC)", "Provide detail drawings for manufacturing instructions", "Liaise with an overseas lab for production schedule planning", "Research paper writing"], period: "April 2019 - June 2020", loc: "Singapore" },
        { pos: "Temporary Research Officer", com: "SUTD Meta Design Lab", scope: ["Assists in developing the Grasshopper component in C#", "Troubleshoot errors in data transfer to the cloud platform", "UI Improvements to make the component more user-friendly"], period: "March 2019 - April 2019", loc: "Singapore" },
        { pos: "Research Officer", com: "SUTD SURGe Lab", scope: ["Liaise with engineers to design mobile furniture following their sensor requirements", "Void deck ambience lighting design & set-up", "Parts & manufacturer procurement", "Social web-app development (front-end [HTML & JavaScript])", "Front-end design for responsive multi-platform web-app", "Set up booth to promote app for user testing", "Research materials procurement"], period: "March 2018 - March 2019", loc: "Singapore" },
        { pos: "Assistant Tutor", com: "AA Visiting School Bamboo Lab", scope: ["Introduced students to CAD softwares and parametric design", "Assisted the Bamboo-based Architectural Design studio"], period: "Nov 2017, Nov 2018", loc: "Singapore" },
        { pos: "Freelance Developer", com: "Weijenberg", scope: ["Assisted in website development (HTML, JavaScript) for minor fixes"], period: "February 2018", loc: "Singapore" },
        { pos: "Student Researcher", com: "SUTD Advanced Architecture Lab", scope: ["Assisted in developing a Grasshopper optimization component, written in C# (UI)", "Developed benchmarking plugin to log the performance of other optimization components", "Digital Fabrication & Manufacturing of parts", "Physical model making"], period: "May 2015 - Sept 2017", loc: "Singapore" },
        { pos: "University Intern", com: "Arup Singapore Pte Ltd", scope: ["Developed in-house program to optimize scheduling processes (C#)", "Facade detail drawings, construction sequence, parametric design"], period: "May - Sept 2016", loc: "Singapore" },
        { pos: "Part-time Waiter", com: "W Singapore - Sentosa Cove", scope: ["Waitering service for the hotel restaurant and banquets"], period: "Feb - May 2014", loc: "Singapore" },
    ];
    const compet = [
        { name: "Founder’s Memorial", com: "National Heritage Board Singapore", period: "April 2019", pos: "" },
        { name: "Pesona Lomba Desain Shelter", com: "Kemenpar Indonesia", period: "August 2018", pos: "" },
        { name: "TATA Customer Service Centre Design", com: "TATA Consultancy Services Singapore", period: "March 2017", pos: "1st Place" },
        { name: "eVolo Skyscraper Competition", com: "eVolo magazine", period: "February 2017", pos: "" },
        { name: "ISTD Receptionist Design", com: "SUTD", period: "February 2017", pos: "2nd Place" },
        { name: "BCA Productivity Challenge", com: "BCA Academy Singapore", period: "September 2016", pos: "" },
        { name: "International BIM Competition", com: "BCA Academy Singapore", period: "September 2016", pos: "" }
    ];

    connection.query('SELECT * FROM user WHERE id = "1"', (error, rows) => {
        if (error) throw error;
        if (!error) {
            console.log(rows);
            res.render('index', { skills, workexp, compet });
        }
    })

})

app.listen(port)
console.log(`Heard on port ${port}`);