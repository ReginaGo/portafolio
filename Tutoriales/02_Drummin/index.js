// Add an event listener for keypress events
document.addEventListener("keypress", function (event) {
    playSound(event.key); // Call the playSound function with the pressed key
    buttonAnimation(event.key); // Trigger button animation
  });
  
  // Add click event listeners to each button
  document.querySelectorAll(".drum").forEach(function (button) {
    button.addEventListener("click", function () {
      const buttonKey = this.innerHTML; // Get the button's inner text
      playSound(buttonKey); // Call the playSound function with the button's key
      buttonAnimation(buttonKey); // Trigger button animation
    });
  });
  
  // Function to play the sound corresponding to a key
  function playSound(key) {
    let audio;
    switch (key) {
      case "w":
        audio = new Audio("./sounds/crash.mp3"); 
        break;
      case "a":
        audio = new Audio("./sounds/kick-bass.mp3"); 
        break;
      case "s":
        audio = new Audio("./sounds/snare.mp3"); 
        break;
      case "d":
        audio = new Audio("./sounds/tom-1.mp3");
        break;
      case "j":
        audio = new Audio("./sounds/tom-2.mp3"); 
        break;
      case "k":
        audio = new Audio("./sounds/tom-3.mp3"); 
        break;
      case "l":
        audio = new Audio("./sounds/tom-4.mp3");
        break;
      default:
        console.log("Key not mapped: " + key); 
        return;
    }
    audio.play(); 
  }
  
  
  function buttonAnimation(currentKey) {
    const activeButton = document.querySelector(`.${currentKey}`);
    if (activeButton) {
      activeButton.classList.add("pressed"); 
      setTimeout(function () {
        activeButton.classList.remove("pressed"); 
      }, 100);
    }
  }
  