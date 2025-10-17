const prompt = require('prompt-sync')({ sigint: true });
const rulesData = require('./rules.js');

console.log("Welcome to the Number Guessing Game!\n");
console.log("Here are the rules of the game:");

rulesData.forEach(rule => {
    console.log(`${rule.id}. ${rule.rule}`);
})


console.log("\nGood luck and have fun!");

let randomNumber = Math.floor(Math.random() * 100) + 1;

const hard = 3;
const medium = 6;
const easy = 9;

function game(attempts){ 
    if (attempts <= 0) {
        console.log(`Sorry, you've run out of attempts😢.\nThe correct number was ${randomNumber}.\nBetter luck next time!`);
        return;
    }

    const userGuess = prompt("Enter your guess (between 1 and 100): ");
    const guessNumber = Number(userGuess);

    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100){
        console.log("Invalid input. Please enter a number between 1 and 100.");
        return game(attempts); // retry without losing an attempt
    }

    if (guessNumber === randomNumber){
        console.log(`Congratulations!🥳 You guessed the correct number (${randomNumber})`);
        return;
    } 
    
    if (guessNumber < randomNumber){
        console.log("Too low! Try again");
    } else {
        console.log("Too high! Try again");
    }

    attempts--;
    console.log(`You have ${attempts} attempts left.`);
    return game(attempts);
}

setTimeout(() => {
    let difficultyLevel = prompt("Choose a difficulty level (easy, medium, hard): ").toLowerCase();

    switch(difficultyLevel){
        case 'easy':
            console.log(`You have chosen easy mode. You have ${easy} attempts to guess the number.`);
            game(easy);
            break;
        case 'medium':
            console.log(`You have chosen normal mode. You have ${medium} attempts to guess the number.`);
            game(medium);
            break;
        case 'hard':
            console.log(`You have chosen hard mode. You have ${hard} attempts to guess the number.`);
            game(hard);
            break;
        default:
            console.log("Invalid difficulty level. Please choose 'easy', 'medium', or 'hard'.");
            break;
    }

}, 5000);