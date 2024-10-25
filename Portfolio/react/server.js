require("dotenv").config();
const express = require('express');
const app = express();
const https = require("https");
const FormData = require("form-data");
const mongoose = require("mongoose")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));//load the files that must be public like img, css js etc
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");//configuration of the engine ejs
var shoppingList = [
  {
    "itemName": "eggs",
    "itemQty": 3
  },
  {
    "itemName": "soda",
    "itemQty": 5
  },
  {
    "itemName": "bread",
    "itemQty": 1
  }
]
var joke = "";
var checked = "";
//
var user = process.env.USER;
var password = process.env.PASSWORD;
var db = process.env.DB;
const mongoURL = `mongodb+srv://${user}:${password}@cluster0.7d4m3.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const shoppingItem =
  new mongoose.Schema({
    //fields that im expecting
    itemName: String,
    itemQty: Number
  });
shoppingItem.set("strictQuery", true);
//the model itself
const SItem = mongoose.model("Item", shoppingItem);
//
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("something went wrong");

});

app.route('/')// the / is the root of the application  /the path + the function handler of the request 
  .get((req, res) => {
    var name = "Regina";

    // complex elements

    var students = [
      {
        "id": 12,
        "name": "Juan",
        "lastname": "Macias",
        "DOB": "01/03/2000"
      },
      {
        "id": 21,
        "name": "Juan",
        "lastname": "Carlos",
        "DOB": "01/03/2000"
      },
      {
        "id": 31,
        "name": "Juan",
        "lastname": "Lopez",
        "DOB": "01/03/2000"
      },
      {
        "id": 41,
        "name": "Juan",
        "lastname": "Tavo",
        "DOB": "01/03/2000"
      }

    ];
    res.render("home", { name, shoppingList, students, joke, checked });//recieves 2 parameters the name of the template, and the place wehre we will pas info to the template
    //res.sendFile(__dirname+"/public/html/index.html"); //dirname es necesario para que la app encuentre el archivo
  });

app.post('/', function (req, res) { //configuring a post method 
  var weight = req.body.weight; //it must match the name of the input in the form
  var height = req.body.height;
  res.send("Your BMI is " + (weight / (height * height)));
});

app.get('/about', (req, res) => {
  res.render("about");
});

app.post('/add', (req, res) => {
  var item = req.body.item;
  var qty = req.body.qty;
  const Nitem =new SItem({
    itemName: item,
    itemQty : qty
  });



  Nitem.save();
  shoppingList.push(Nitem);
  res.redirect("/");
});

app.post('/check', (req, res) => {
  var word = req.body.word;

  var url = "https://www.api.toys/api/check_dictionary";
  var form_data = new FormData();
  form_data.append("text", word);
  const options = {
    method: "POST",
    headers: form_data.getHeaders()
  };
  var sReq = https.request(url, options, (response) => {
    console.log("got a response ");
    var content = "";

    response.on("data", (data) => {
      content += data;
    }).on("end", () => {
      var jsonObj = JSON.parse(content);
      checked = jsonObj["found"] ? "TRUE" : "FALSE";
      // res.write(content);
      // res.send();
      res.redirect("/");

    }).on("error", (e) => {
      console.log("got an error {e.message}");

    });
  });
  form_data.pipe(sReq);
  //res.send(sReq.text)
  //res.redirect("/");
});


app.get('/delete', (req, res) => {
  var index = req.query.idx;
  delete shoppingList[index];
  res.redirect("/");
});

app.get('/joke', (req, res) => {
  var url = "https://v2.jokeapi.dev/joke/Any?type=single";
  https.get(url, (response) => {
    console.log("got a response ");
    var content = "";

    response.on("data", (data) => {
      content += data;
    }).on("end", () => {
      var jsonObj = JSON.parse(content);
      joke = jsonObj["joke"];
      // res.write(content);
      res.redirect("/");
      // res.send();
    }).on("error", (e) => {

    });
  });
});

app.get('/remove/:idx', (req, res) => {
  var index = req.params.idx;
  delete shoppingList[index];
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("PP tema Rafa on port 3000");
});

//app.listen(3000)//el numero puede ser cambiado 