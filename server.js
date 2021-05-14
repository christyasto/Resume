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
        [
            { skill: "Rhinoceros", lvl: 10 },
            { skill: "Grasshopper", lvl: 10 },
            { skill: "AutoCAD", lvl: 8 },
            { skill: "Adobe Softwares", lvl: 8 }
        ],
        [
            { skill: "C#", lvl: 8 },
            { skill: "HTML", lvl: 8 },
            { skill: "Java", lvl: 8 },
            { skill: "Python", lvl: 6 },
            { skill: "VBA", lvl: 4 },
            { skill: "MySQL", lvl: 2 }
        ],
        [
            { skill: "Word, Excel, Powerpoint", lvl: 8 },
            { skill: "Unity3D", lvl: 3 },
        ]

    ];
    const workexp = [
        { pos: "Research Officer", com: "SUTD International Design Centre", scope: ["Quick learning of new bio-material and analysis method (SEM)", "Prototyping & digital fabrication (3D print, laser-cut, CNC)", "Provide detail drawings for manufacturing instructions", "Liaise with an overseas lab for production schedule planning", "Research paper writing"], period: "April 2019 - June 2020", loc: "Singapore" },
        { pos: "Research Officer", com: "SUTD International Design Centre", scope: ["Quick learning of new bio-material and analysis method (SEM)", "Prototyping & digital fabrication (3D print, laser-cut, CNC)", "Provide detail drawings for manufacturing instructions", "Liaise with an overseas lab for production schedule planning", "Research paper writing"], period: "April 2019 - June 2020", loc: "Singapore" },
    ];
    const compet = [
        { name: "International BIM Competition", com: "BCA Academy Singapore", period: "September 2016", pos: "1st Place" },
        { name: "International BIM Competition", com: "BCA Academy Singapore", period: "September 2016", pos: "" }
    ];
    res.render('index', { skills, workexp, compet });
})

app.listen(8000, function() {
    console.log("heard on 8000");
})