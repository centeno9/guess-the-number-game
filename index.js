import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chancesByDifficulty = {
  1: 10,
  2: 6,
  3: 3,
};

let chancesLeft = 0;
let selectedNumber = 0;
let hasWon = false;
let attempts = 0;

const difficultyText = ["Easy", "Medium", "Hard"];

const main = async () => {
  let quit = false;

  console.log("Welcome to the Number Guessing Game!");

  while (!quit) {
    console.log(`

      Please select an option:

        1. Start game
        2. Close game
    `);

    const input = await askQuestion("Enter your selection: ");

    const parsedInput = parseInt(input);

    if (!isValidInput(parsedInput, 1, 2)) {
      console.log("Oops, that's not a valid option, try again.");
      continue;
    }

    if (parsedInput === 1) {
      restartValues();
      await playGame();
    }

    if (parsedInput === 2) quit = true;
  }

  console.log("SEE YOU NEXT TIME! Closing game...");
  rl.close();
};

main();

async function playGame() {
  let keepPlaying = true;
  while (keepPlaying) {
    if (attempts === 0) {
      selectedNumber = generateRandomNumberInRange(1, 100);

      console.log(`
        I'm thinking of a number between 1 and 100.
      `);

      console.log(`
      Please select the difficulty level:\n
          1. Easy   (10 chances)
          2. Medium (6 chances)
          3. Hard   (3 chances)  
      `);

      const difficultySelected = await getDifficulty();

      chancesLeft = chancesByDifficulty[difficultySelected];

      console.log(`
        Great! You have selected the ${difficultyText[difficultySelected - 1]} difficulty level.
        Let's start the game!
    
        You have ${chancesLeft} chances to guess the correct number.
      `);

      while (chancesLeft > 0 && !hasWon) {
        const guessInput = await askQuestion("Enter your guess: ");

        const parsedNumber = parseInt(guessInput);

        if (!isValidInput(parsedNumber, 1, 100)) {
          console.log(`Invalid input`);
          continue;
        }

        attempts++;

        if (parsedNumber === selectedNumber) {
          hasWon = true;
          break;
        }

        if (parsedNumber < selectedNumber)
          console.log("The mystery number is higher than your input");

        if (parsedNumber > selectedNumber)
          console.log("The mystery number is lower than your input");

        chancesLeft--;

        console.log(`\nChances remaining: ${chancesLeft}\n`);
      }

      if (hasWon) {
        console.log(
          `\n\nCONGRATULATIONS YOU WON! you guessed the correct number in ${attempts} attempts`,
        );
      } else {
        console.log(`Sorry but you lost!`);
        console.log(`The number was ${selectedNumber}`);
        console.log(`Best luck next time!`);
      }
    }

    console.log(`
    Play again?
  
      1. Yes
      2. No
      
  `);
    const input = await askQuestion("Enter your choice:");
    const parsedInput = parseInt(input);
    if (!isValidInput(parsedInput, 1, 2)) {
      console.log("Invalid option");
    }

    if (parsedInput === 1) restartValues();

    if (parsedInput === 2) keepPlaying = false;
  }
}

function restartValues() {
  attempts = 0;
  hasWon = false;
  chancesLeft = 0;
  selectedNumber = 0;
}

function isValidInput(input, min, max) {
  return !isNaN(input) && input >= min && input <= max;
}

async function getDifficulty() {
  let difficult = 0;

  while (difficult === 0) {
    const difficultInput = await askQuestion(`Enter your choice: `);

    const parsedNumber = parseInt(difficultInput);

    if (!isValidInput(parsedNumber, 1, 3)) {
      console.log(`Invalid selection`);
      continue;
    }

    difficult = parsedNumber;
  }

  return difficult;
}

function generateRandomNumberInRange(start, end) {
  const min = Math.ceil(start);
  const max = Math.floor(end);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}
