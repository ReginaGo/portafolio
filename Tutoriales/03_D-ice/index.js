
 
  const randomNumber1 = Math.floor(Math.random() * 6) + 1; // Para el dado 1
  const randomNumber2 = Math.floor(Math.random() * 6) + 1; // Para el dado 2


  document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
  document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");
