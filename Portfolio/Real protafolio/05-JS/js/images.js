
var myGamePiece;

// Canvas and game initialization
function startGame() {
  myGamePiece = new component(30, 30, "./images/smiley.gif", 10, 120, "image");
  myGameArea.start();
}


var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};


function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;

  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  this.newPos = function (canvasWidth, canvasHeight) {
   
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.type == "image") {
      
      if (this.x >= canvasWidth - this.width || this.x <= 0) {
        this.speedX = -this.speedX; // reverse direction
        this.x = Math.max(0, Math.min(this.x, canvasWidth - this.width)); // correct position
      }
      if (this.y >= canvasHeight - this.height || this.y <= 0) {
        this.speedY = -this.speedY; // reverse direction
        this.y = Math.max(0, Math.min(this.y, canvasHeight - this.height)); // correct position
      }
    }
  };
}


function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos(myGameArea.canvas.width, myGameArea.canvas.height);
  myGamePiece.update();
}

// Methods that control the movement of the object
function moveup() {
  myGamePiece.speedY -= 1;
}

function movedown() {
  myGamePiece.speedY += 1; // Increase speedY to move down
}

function moveleft() {
  myGamePiece.speedX -= 1; // Decrease speedX to move left
}

function moveright() {
  myGamePiece.speedX += 1; // Increase speedX to move right
}
