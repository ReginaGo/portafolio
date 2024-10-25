
import supervillains from 'supervillains';
supervillains;
import superheroes from 'superheroes';
superheroes;
import sw from 'star-wars-quotes'; 

import {randomSuperhero} from 'superheroes';
var superName = randomSuperhero();

import {randomSupervillain} from 'supervillains';
var evil = randomSupervillain();

import fs from 'fs';
//const fs = require('fs');

fs.readFile('data/input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error leyendo el archivo:", err);
    return;
  }
  console.log("-----------------------------------");
  console.log("El mensaje secreto es:", data);
});
console.log("-----------------------------------");

console.log("The amazing " +superName+ " vs "+ evil);
console.log("-----------------------------------");

console.log(sw())
console.log("-----------------------------------");
//star wars quote
console.log("Hello World");
