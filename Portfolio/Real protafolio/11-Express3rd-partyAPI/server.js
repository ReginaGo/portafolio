const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(express.static("public"));

const apiKey = process.env.PIZZA;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const cityName = req.body.cityName;
  //const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const unit = 'metric';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const weatherData = JSON.parse(data);
        if (weatherData.cod === 200) {
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          res.render('weather', { cityName, temp, description, imageURL });
        } else {
          res.render('error', { message: weatherData.message });//directo del APi jaja
        }
      } catch (error) {
        res.render('error', { message: 'An error occurred while processing the weather data.' });
      }
    });
  }).on('error', (error) => {
    res.render('error', { message: 'An error occurred while fetching the weather data.' });
  });
});


app.listen(3000, () => {
    console.log("PP tema Rafa on port 3000");
  });