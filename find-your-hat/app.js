// set-up user input
const prompt = require("prompt-sync")({ sigint: true });

// game elements
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// define variables
let gameOver = false;
let myField;

// construct game field here
class Field {
  constructor(arr) {
    this.field = arr;
  }

  // helper to return the field
  array() {
    return this.field;
  }

  // join array to readable string and log it
  print() {
    this.string = this.field.map((row) => row.join("")).join("\n");
    console.log(this.string);
  }

  // generate random field
  static generateField(w, h) {
    // randomly place hole or fieldCharacter
    function getRandomChoice() {
      const randomNumber = Math.random();
      if (randomNumber < 0.3) {
        // probability for holes is quite low
        return hole;
      } else {
        return fieldCharacter;
      }
    }

    // generate new field array
    let newField = Array.from({ length: h }).map(() =>
      Array.from({ length: w }).map(() => getRandomChoice())
    );

    // intial payer position on top left
    newField[0][0] = pathCharacter;

    // find random position for hat
    let hatRow = Math.floor(Math.random() * h);
    let hatCol = Math.floor(Math.random() * w);

    // make sure hat is not placed on a hole
    while (newField[hatRow][hatCol] !== fieldCharacter) {
      hatRow = Math.floor(Math.random() * h);
      hatCol = Math.floor(Math.random() * w);
    }

    // place hat
    newField[hatRow][hatCol] = hat;

    // output field
    return newField;
  }
}

const newGame = () => {
  // reset player position
  let posX = 0;
  let posY = 0;

  // default field for testing
  myField = new Field([
    ["*", "░", "O"],
    ["░", "O", "░"],
    ["░", "^", "░"],
  ]);

  // set up game by letting user specify the field size
  let userSetup = prompt(
    "Choose the size of the field with a number between 4 and 24: "
  );

  let userNumber = +userSetup; // Convert the input to a number

  // check if the input was is a number between 4 and 24
  if (!isNaN(userNumber) && userNumber >= 4 && userNumber <= 24) {
    //genrate random field in specified size and replace default field
    myField.field = Field.generateField(userSetup, userSetup);
    // print field
    myField.print();
    // start game
    gameOver = false;
  } else {
    // if input is invalid, start over
    console.log("Did you pick a number between 2 and 24?");
    newGame();
    return;
  }

  // update player position
  const updatePath = () => {
    // check if player left the field
    if (
      posY >= 0 &&
      posY < myField.array().length &&
      posX >= 0 &&
      posX < myField.array()[0].length
    ) {
      // check if player fell down a hole
      if (myField.array()[posY][posX] === hole) {
        gameLost("Game Over *** You fell down a hole!");
      }
      // check if player found the hat
      else if (myField.array()[posY][posX] === hat) {
        gameWon();
      }
      // if player did not find the hat or fall down a hole, update the position and log the updated field
      else {
        myField.array()[posY][posX] = pathCharacter;
        myField.print();
      }

      // if player left the field, end the game
    } else {
      gameLost("Game Over *** You moved outside of the field!");
    }
  };

  while (!gameOver) {
    let userInput = prompt("Move using W A S D: ");
    switch (userInput.toLowerCase()) {
      // move up
      case "w":
        posY--;
        updatePath();
        break;
      // move left
      case "a":
        posX--;
        updatePath();
        break;
      // move down
      case "s":
        posY++;
        updatePath();
        break;
      // move right
      case "d":
        posX++;
        updatePath();
        break;
      // invalid user input
      default:
        console.log("Did you use the keys W A S D to navigate?");
    }
  }
};

// start initial game
newGame();

// ends the game and logs the reason for ending it
const gameLost = (str) => {
  gameOver = true;
  console.log(str);
};

// ends the game and logs a winning message
const gameWon = () => {
  gameOver = true;
  console.log("You Win *** Found the hat!  =)");
};

// ask user if they want to restart
while (gameOver) {
  let userInput = prompt("New game - Y/N? ");
  switch (userInput.toLowerCase()) {
    case "y":
      // restart application
      newGame();
      break;
    case "n":
      console.log("Quitting app…");
      // close application
      process.exit();
      break;
    default:
      console.log("Type 'Y' to restart or 'N' to quit");
  }
}
