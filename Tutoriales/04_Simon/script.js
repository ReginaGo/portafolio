var arr = ["red", "blue", "green", "yellow"]; //colores de los botones
var pattern = []; //guardar los colores que van saliendo randomly
var userPattern = [];
var level = 0; //el nivel del juego
var started = false;


$(document).keydown(function () {
    console.log("si funciono, si me activo");
    
    //nextSequence();
    if (!started) {
        $("#level-title").text("Level " + level); // cambiar el nombre del h1 a el nivel actual
        nextSequence(); // so we also have to update the h1 tag everytime a new element is added to the sequence in the nextSequence method.
        started = true;
    }
});

$(".btn").click(function () {
    var userColor = $(this).attr("id"); //$this se refiere al elemnto clickeado
    userPattern.push(userColor);
    console.log("User Pattern:", userPattern); //verificar el patrón del usuario

    playSound(userColor);
    animatePress(userColor);
    check(userPattern.length - 1); 
});

function check(currentLevel) {
   
    if (userPattern[currentLevel] === pattern[currentLevel]) {
        console.log("mismo color");

       
        if (userPattern.length === pattern.length) {
            console.log("mismo largo");
            setTimeout(function () {
                nextSequence(); // generar la siguiente secuencia
            }, 1000);
        }
    } else {
        // Si el usuario falla
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        restart(); // reiniciar el juego
    }
}

function nextSequence() {
    userPattern = []; // resetear el patrón del usuario en cada nivel
    level++;
    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random() * 4); // elegir un número random
    var randomColor = arr[randomNum];
    pattern.push(randomColor); // agregar el color al pattern
    console.log("Pattern updated:", pattern); //verificar si el patrón se actualiza correctamente

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomColor); 
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//settear los valores del juego a su forma inicial
function restart() {
    pattern = [];
    userPattern = []; 
    level = 0;
    started = false;
}

console.log(level, started);
