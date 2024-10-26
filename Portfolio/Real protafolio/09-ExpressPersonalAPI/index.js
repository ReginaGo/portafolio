const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use(express.static("public"));//load the files that must be public like img, css js etc
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let names = [];
let tasks = [];


app.get('/', (req, res) => {
    res.render('index', { names, tasks, errorMessage: null });
});


app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        names.push(name);
        console.log(name);
    }
    res.redirect('/');
});


app.get('/wazzup/:name', (req, res) => {
    const name = req.params.name;
    if (names.includes(name)) {
        res.render('wazzup', { name });
    } else {
        res.render('index', { names, tasks, errorMessage: "No existe :P" });
    }
});


app.post('/task', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});


app.post('/task/delete', (req, res) => {
    const taskIndex = req.body.taskIndex;
    tasks.splice(taskIndex, 1);
    res.redirect('/');
});

app.put('/greet/:name', (req, res) => {
    const name = req.params.name;
    if (name) {
        names.push(name);
    }
    res.json({ names });
});


app.use((err, req, res, next) => {
    res.status(500).render('index', { names, tasks, errorMessage: "Error: fuera de rawngo" });
});


app.listen(3000, () => {
    console.log("PP tema Rafa on port 3000");
  });