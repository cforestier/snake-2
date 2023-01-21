const myGameArea = {
  canvas: document.createElement("canvas"),
  components: [],
  // create general components, player and background
  bonus: [],
  //   array for bonus that gets filled in
  joker: [],
  //   array for bonus that gets filled in
  start: function () {
    let playerMovesDown = false;
    let playerMovesUp = false;
    let playerMovesLeft = false;
    let playerMovesRight = false; // add the variables into the start function so that when we start all functions are back to false
    this.canvas.width = 500;
    this.canvas.height = 300;
    this.context = this.canvas.getContext("2d");
    const gameBoard = document.getElementById("game-board");
    gameBoard.appendChild(this.canvas);
  }, // standard canvas variables
  updateGame: function () {
    myGameArea.components.forEach((component) => {
      component.render();
    });
    myGameArea.bonus.forEach((bonus1) => {
      if (bonus1.checkEating(player)) {
        score += 1; // create bonus give score 1
        if (player.speed < 5) {
          // puts a limit on the speed
          player.speed += 0.1; // increase the speed of the player if he eats a bonus
        }
        let indexBonus1 = myGameArea.bonus.indexOf(bonus1); //find the index of the bonus from the bonus array
        myGameArea.bonus.splice(indexBonus1, 1); // remove this specific bonus using the index from the array
      }
      bonus1.render(); // if no collision, just render the bonus
    });
    myGameArea.joker.forEach((joker1) => {
      if (joker1.checkEating(player)) {
        if (player.speed < 5) {
          // puts a limit on the speed
          player.speed += 0.1; // increase the speed of the player if he eats a joker
        }
        score += 2; // create bonus give score 2
        let indexJoker1 = myGameArea.joker.indexOf(joker1); //find the index of the bonus from the bonus array
        myGameArea.joker.splice(indexJoker1, 1); // remove this specific bonus using the index from the array
      }
      joker1.render(); // if no collision, just render the joker
    });
    myGameArea.context.font = "20px Verdana";
    myGameArea.context.fillStyle = "black";
    myGameArea.context.fillText(
      `Score: ${score}`,
      myGameArea.canvas.width / 10,
      40
    );
    // display of score on top left
  },
  updateLinearMovement: function () {
    if (
      myGameArea.playerMovesDown &&
      player.y >= myGameArea.canvas.height - 10
    ) {
      player.y = 0;
    } else if (
      myGameArea.playerMovesDown &&
      player.y <= myGameArea.canvas.height - 10
    ) {
      player.y += player.speed;
    } else if (myGameArea.playerMovesUp && player.y <= 0) {
      player.y = myGameArea.canvas.height - 10;
    } else if (myGameArea.playerMovesUp && player.y >= 0) {
      player.y -= player.speed;
    } else if (myGameArea.playerMovesLeft && player.x <= 0) {
      player.x = myGameArea.canvas.width - 10;
    } else if (myGameArea.playerMovesLeft && player.x >= 0) {
      player.x -= player.speed;
    } else if (
      myGameArea.playerMovesRight &&
      player.x >= myGameArea.canvas.width - 10
    ) {
      player.x = 0;
    } else if (
      myGameArea.playerMovesRight &&
      player.x < myGameArea.canvas.width - 10
    ) {
      player.x += player.speed;
    }
  }, // function to update the movement of the snake and respawn the snake on the other side of the screen
};

class Component {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    if (color) this.color = color;
  }
  // standard class constructor
  render() {
    const ctx = myGameArea.context;
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
  // render function which render the image when an image is present or render a rectangle when no images
  checkEating(otherComponent) {
    if (
      this.x < otherComponent.x + otherComponent.w &&
      this.x + this.w > otherComponent.x &&
      this.y < otherComponent.y + otherComponent.h &&
      this.y + this.h > otherComponent.y
    ) {
      return true;
    } else {
      return false;
    }
  }
  //   equivalent to checkcollision function
}

class Player extends Component {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "black";
    this.speed = 10;
  } // class for the player
  // moveDown() {
  //   //possibility to move down the player
  //   if (this.y >= myGameArea.canvas.height - 10) {
  //     // function to replace the player on the top side of the screen if he moves away from the screen
  //     player.y = 0;
  //   } else {
  //     this.y += 10;
  //   }
  // }
  // moveUp() {
  //   if (this.y < 10) {
  //     player.y = myGameArea.canvas.height - 10;
  //   } else {
  //     this.y -= 10;
  //   }
  // }
  // moveLeft() {
  //   if (this.x < 10) {
  //     player.x = myGameArea.canvas.width - 10;
  //   } else {
  //     this.x -= 10;
  //     //   this.moveLeft()
  //   }
  // }
  // moveRight() {
  //   if (this.x >= myGameArea.canvas.width - 10) {
  //     this.x = 0;
  //   } else {
  //     this.x += 10;
  //   }
  // } we do not need to move the snake it moves only by updatelinearmovement
}

class Background extends Component {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
    this.w = w;
    this.h = h;
    this.color = "#96d202";
  }
} // class for background using the standard color of the snake 2

class Bonus extends Component {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "yellow";
  } // class for bonuses
}
class Joker extends Component {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "#EE82EE";
  } // class for joker
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Down": // IE/Edge specific value
    case "ArrowDown":
      myGameArea.playerMovesLeft = false;
      myGameArea.playerMovesRight = false;
      myGameArea.playerMovesUp = false;
      myGameArea.playerMovesDown = true;
      // player.moveDown();
      break;
    case "Up": // IE/Edge specific value
    case "ArrowUp":
      myGameArea.playerMovesLeft = false;
      myGameArea.playerMovesRight = false;
      myGameArea.playerMovesUp = true;
      myGameArea.playerMovesDown = false;
      // player.moveUp();
      break;
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
      myGameArea.playerMovesLeft = true;
      myGameArea.playerMovesRight = false;
      myGameArea.playerMovesUp = false;
      myGameArea.playerMovesDown = false;
      // player.moveLeft();
      break;
    case "Right": // IE/Edge specific value
    case "ArrowRight":
      myGameArea.playerMovesLeft = false;
      myGameArea.playerMovesRight = true;
      myGameArea.playerMovesUp = false;
      myGameArea.playerMovesDown = false;
      // player.moveRight();
      break;
    case "Enter":
      // Do something for "enter" or "return" key press.
      break;
    case "Esc": // IE/Edge specific value
    case "Escape":
      // Do something for "esc" key press.
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }
});

let player, background; // creation of the player and background

document.getElementById("start-button").addEventListener("click", (event) => {
  // create an event on the start game button
  myGameArea.start(); // start the game

  background = new Background(
    0,
    0,
    myGameArea.canvas.width,
    myGameArea.canvas.height
  );
  myGameArea.components.push(background);

  player = new Player(
    myGameArea.canvas.width / 2, //positions the player in the center width
    myGameArea.canvas.height / 2, //positions the player in the center height
    10 * 3, //length of the player
    10 // width of the player
  );
  myGameArea.components.push(player); // pushed the player inside the components array (with the background)

  setInterval(() => {
    let randomXBonus =
      Math.floor((Math.random() * myGameArea.canvas.width - 10) / 10) * 10; // divides by 10 before rounding and multiply by ten so that numbers are rounded to 10s
    let randomYBonus =
      Math.floor((Math.random() * myGameArea.canvas.height - 10) / 10) * 10;

    let anyBonus = new Bonus(randomXBonus, randomYBonus, 10, 10);
    myGameArea.bonus.push(anyBonus);
  }, 4000);
  //   creates the random bonuses using a setinterval of 4000

  setInterval(() => {
    let randomXJoker =
      Math.floor((Math.random() * myGameArea.canvas.width - 10) / 10) * 10;
    let randomYJoker =
      Math.floor((Math.random() * myGameArea.canvas.height - 10) / 10) * 10;

    let anyJoker = new Joker(randomXJoker, randomYJoker, 10, 10);
    myGameArea.joker.push(anyJoker);
  }, 8000); //creates the exact same for jokers and can change the timing of jokers

  setInterval(myGameArea.updateGame, 1000 / 60);
  // frequency of update of the game
  setInterval(myGameArea.updateLinearMovement, 40000 / 60);
  // frequency of update of the movement of the snake (made two different to have a sequenced movement by 10 so that it's always moving 10 by 10 on every axis)
});

let score = 0; // score starts at 0
