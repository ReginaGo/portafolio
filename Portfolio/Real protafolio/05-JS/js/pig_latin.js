function igpayAtinlay(str) {
  // Dividir la cadena en palabras
  var wordArray = str.split(" ");
  var returnArray = [];

  for (var i = 0; i < wordArray.length; i++) {
      var word = wordArray[i];
      var beginning = word.charAt(0);

     
      if (/[aeiouAEIOU]/.test(beginning)) {
          returnArray.push(word + "way");
          continue;
      }

     
      for (var ii = 1; ii < word.length; ii++) {
          if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
              returnArray.push(word.slice(ii) + beginning + word.slice(1, ii) + "ay");
              break;
          } else {
              beginning += word.charAt(ii);
          }
      }
  }

 
  document.getElementById("pigLatLbl").textContent = returnArray.join(" ");
}

// Agregar el event listener al botón
document.getElementById("btn").addEventListener("click", function() {
  var inputText = document.getElementById("txtVal").value; // Cambiado para usar el ID correcto
  igpayAtinlay(inputText); // Llamar a la función con el texto de entrada
});
