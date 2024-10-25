const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.route('/')// the / is the root of the application  /the path + the function handler of the request 
.get( (req, res) => { 
    res.sendFile(__dirname + "/public/index.html"); 
});

app.post('/', function (req, res) { //configuring a post method 
    var weight =req.body.weight; //it must match the name of the input in the form
    var height =req.body.height;
    var bmi = (weight / (height*height)*10000).toFixed(2);//nmms sino son un monton de decimales 
    res.redirect(`/bmip.html?bmi=${bmi}`); 
  });

app.listen(3000, () => {
    console.log("PP tema Rafa on port 3000");
  });