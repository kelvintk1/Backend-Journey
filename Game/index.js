const rulesData = require('./rules');

console.log("Welcome to the Number Guessing Game!\n");
console.log("Here are the rules of the game:");

rulesData.map(rule => {
    console.log(`${rule.id}. ${rule.rule}`);
})

setTimeout(() => {
    console.log("\nGood luck and have fun!");
}, 10000);

let randomNumber = Math.floor(Math.random() * 100) + 1;

const hard = 9;
const medium = 6;
const easy = 3;

function game(numAttempts){ 
    const userGuess = require('prompt-sync')()("Enter your guess (between 1 and 100): "); 
    const guessNumber = Number(userGuess);
    numAttempts = attempts;

    if(isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100){
        console.log("Invalid input. Please enter a number between 1 and 100.");
    }

    if(guessNumber === randomNumber){
        console.log(`Congratulations!🥳 You guessed the correct number (${randomNumber}) in ${attempts} `)
    } else if(guessNumber < randomNumber){
        console.log("Too low! Try again")
        attempts--;
        console.log(`You have ${attempts} attempts left.`)
        game(attempts);
    } else if(guessNumber > randomNumber){
        console.log("Too high! Try again")
        attempts--;
        console.log(`You have ${attempts} attempts left.`)
        game(attempts);
    }

    if(attempts === 0){
        console.log(`Sorry, you've run out of attempts😢.\nThe correct number was ${randomNumber}.\nBetter luck next time!`);
    }
}

let difficultyLevel = prompt("Choose a difficulty level (easy, medium, hard): ").toLowerCase();

switch(difficultyLevel){
    case 'easy':
        game(easy);
        break;
    case 'medium':
        game(medium);
        break;
    case 'hard':
        game(hard);
        break;
    default:
        console.log("Invalid difficulty level. Please choose 'easy', 'medium', or 'hard'.");
        break;
}