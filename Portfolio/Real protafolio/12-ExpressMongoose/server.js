//Profe de verdad lo intente y mucho pero ya no supe como mas manejar el error de el manejo de formatos de DATE en 
//Pues en mongo usan otro fromato y el del form es MM/DD/YYYY y se hizo un desastre
//si puede explicarlo en clase estar[ia] super bien, gracias
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// MongoDB connection
var user = process.env.USER;
var password = process.env.PASS;
var db = process.env.DB;
const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.7d4m3.mongodb.net/${db}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of schemas
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

// Countries array
let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];


app.use(async (req, res, next) => {
  try {
    const teams = await Team.find({});
    const drivers = await Driver.find({});
    req.teams = teams;
    req.drivers = drivers;
    next();
  } catch (error) {
    console.error("Error loading data:", error);
    res.status(500).send("Error loading data");
  }
});


function loadCsvData() {
  const csvPath = path.join(__dirname, "public/data/f1_2023.csv");
  const csvData = fs.readFileSync(csvPath, "utf-8");
  const lines = csvData.split("\n").slice(1); // Remove header line

  lines.forEach(async (row) => {
    try {
      const [num, code, forename, surname, dob, nationality, url, teamName] = row.split(',');

      if (teamName) {
        const team = await Team.findOne({ name: teamName.trim() }) || new Team({ name: teamName.trim() });
        await team.save();

        const driver = new Driver({
          num: (parseInt(num, 10) || "unknown"),
          code: code.trim() || "unknown",
          forename: forename.trim() || "unknown",
          surname: surname.trim() || "unknown",
          dob: (dob ? new Date(Date.parse(dob)) : null),
          nationality: nationality.trim() || "unknown",
          url: url.trim() || "unknown",
          team: team || null,
        });

        await driver.save();
      } else {
        console.log(`Error loading data: missing team name for ${forename} ${surname}`);
      }
    } catch (error) {
      console.error(`Error processing row: ${row}`, error);
    }
  });
}

loadCsvData();


app.post('/driver', async (req, res) => {
    console.log("Received data:", req.body); // Log the incoming data

    const { num, code, name, lname, dob, url, nation, team } = req.body;

    
    const parsedDob = new Date(dob);
    if (isNaN(parsedDob.getTime())) {
        console.error("Invalid date format:", dob);
        return res.status(400).send("Invalid date format");
    }

    const driver = new Driver({
        num: parseInt(num),
        code: code.trim(),
        forename: name .trim(),
        surname: lname.trim(),
        dob: parsedDob,
        nationality: nation,
        url: url.trim(),
        team: team,
    });

    try {
        await driver.save();
        res.redirect("/");
    } catch (error) {
        console.error("Error saving driver:", error);
        res.status(500).send("Error saving driver");
    }
});


app.get("/", (req, res) => {
  res.render("index", { countries, teams: req.teams, drivers: req.drivers });
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
  console.log("User value:");
  console.log("Password:");
});