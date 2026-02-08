# Number Guessing Game

A simple CLI number guessing game built with Node.js. Pick a difficulty, then guess the mystery number between 1 and 100 before you run out of chances.

## Setup

1. Install Node.js (v18+ recommended).
2. Install dependencies:

```bash
npm install
```

## Run

```bash
npm run start
```

You can also run in watch mode:

```bash
npm run dev
```

## How To Play

1. Start the game from the main menu.
2. Choose a difficulty:
   - Easy: 10 chances
   - Medium: 6 chances
   - Hard: 3 chances
3. Enter guesses between 1 and 100.
4. After each guess, you'll be told whether the mystery number is higher or lower.
5. Win by guessing the correct number before your chances run out.
6. When the round ends, choose whether to play again.

## Notes

- Invalid inputs are rejected, and you will be prompted again.
- The mystery number is regenerated each round.
