const rulesData = [
    {id: 1, rule: "The computer would randomly select a number between 1 and 100."},
    {id: 2, rule: "The player would have to guess the number."},
    {id: 3, rule: "After each guess, the computer would tell the player if their guess was too high, too low, or correct✅."},
    {id: 4, rule: "You have a number of attempts to guess the correct number depending on the difficulty level you choose.\n Easy: 9 attempts\n Medium: 6 attempts\n Hard: 3 attempts"},
    {id: 5, rule: "You have upto 30 seconds to guess a number.\n If you exceed the time limit, you loose an attempt⏰❌."},
    {id: 6, rule: "If you run out of attempts, you loose ❌👎."},
    {id: 7, rule: "The player could choose to play again after guessing the correct number."}
]

module.exports = rulesData;