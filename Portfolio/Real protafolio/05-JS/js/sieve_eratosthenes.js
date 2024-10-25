var sieve = function (n) {
  "use strict";

  
  var array = new Array(n).fill(true);
  var primes = [];

  // 0 y 1 no son primos
  array[0] = array[1] = false;

  
  for (var i = 2; i < Math.sqrt(n); i++) {
      if (array[i]) { // Si i  es primo
          for (var j = i * i; j < n; j += i) { //mults de i no primos 
              array[j] = false;
          }
      }
  }


  for (var k = 2; k < n; k++) {
      if (array[k]) {
          primes.push(k);
      }
  }

  return primes;
};

// Agregar evento al botón
document.getElementById("btn").addEventListener("click", function() {
  var num = parseInt(document.getElementById("num").value); // Obtener el número ingresado
  if (isNaN(num) || num <= 1) {
      document.getElementById("primes").textContent = "Please enter a number greater than 1.";
      return;
  }
  var primes = sieve(num); // Llamar a la función sieve
  document.getElementById("primes").textContent = primes.join(", "); // Mostrar los primos en el span
});

