var getPrimeFactors = function () {
  "use strict";

  var n = parseInt(document.getElementById("num").value); // Obtener el número ingresado
  var sequence = []; 

  
  while (n % 2 === 0) {
      sequence.push(2); // Agregar 2 a la secuencia
      n /= 2; // Dividir n por 2
  }

  
  for (var i = 3; i <= Math.sqrt(n); i += 2) {
      // Mientras i divide n
      while (n % i === 0) {
          sequence.push(i); // Agregar i a la secuencia
          n /= i; // Dividir n por i
      }
  }

 
  if (n > 2) {
      sequence.push(n);
  }

 
  document.getElementById("pf").textContent = sequence.join(", ");
};


console.log(getPrimeFactors(30030));
