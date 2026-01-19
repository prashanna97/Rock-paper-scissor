let score = JSON.parse(localStorage.getItem('score'));

// Variables for round tracking
let totalRounds = 0;
let currentRound = 0;
let gameActive = false;

startGame = () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.game-error-msg').innerHTML = '';
    const roundsInput = document.getElementById('rounds-input');
    const rounds = parseInt(roundsInput.value);
    if (isNaN(rounds) || rounds < 1 || rounds > 100) {
        document.querySelector('.game-start-msg').innerHTML = 'Please enter a valid number of rounds between 1 and 100.';
        gameActive = false;
        return;
    }
    totalRounds = rounds;
    currentRound = 0;
    gameActive = true;
    document.querySelector('.game-start-msg').innerHTML = `Game started for ${rounds} rounds! Good luck!`;
    document.querySelector('.js-result').innerHTML = '';
}

if(!score){   //if no score in local storage default value
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
}
updateScoreElement();
document.querySelector('.js-score').style.fontSize = '20px';

// Initialize with rock for both player and computer
let playerChoice = 'rock';
let computerChoice = 'rock';
document.querySelector('.js-choose').innerHTML = 
`You choosed 
    <img src="img/${playerChoice}-emoji.png" class="move-icon player-choice-icon"> 
computer choosed 
    <img src="img/${computerChoice}-emoji.png" class="move-icon computer-choice-icon">`;

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `wins : ${score.wins}, losses : ${score.losses}, ties: ${score.ties}`;
}



//Function to play Rock, Paper, Scissors
function playGame(playerChoice) {
    // Check if game is active and rounds remaining
    if (!gameActive) {
        return;
    }
    
    if (currentRound >= totalRounds) {
        gameActive = false;
        return;
    }
    
    currentRound++;
    
let computerChoice = '';
const randomNum = Math.random();
if(randomNum >= 0 && randomNum < 1/3){
    computerChoice = 'rock';
}
else if(randomNum >= 1/3 && randomNum < 2/3){
    computerChoice = 'paper';
}
else{
    computerChoice = 'scissors';
}
let result = '';
if (computerChoice === playerChoice) {
    result = 'Tie.';
} else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
) {
    result = 'You win.';
} else {
    result = 'You lose.';
}

if(result === 'You win.'){
    score.wins +=1;
}
else if(result === 'You lose.'){
    score.losses += 1;
}
else if(result === 'Tie.'){
    score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));
updateScoreElement();

// Show animation - start with rock
document.querySelector('.js-choose').innerHTML = 
`You choosed 
    <img src="img/rock-emoji.png" class="move-icon player-choice-icon"> 
computer choosed 
    <img src="img/rock-emoji.png" class="move-icon computer-choice-icon">`;
document.querySelector('.js-result').innerHTML = '';

// After animation completes, show actual choices and result
setTimeout(() => {
    document.querySelector('.js-choose').innerHTML = 
    `You choosed 
        <img src="img/${playerChoice}-emoji.png" class="move-icon player-choice-icon"> 
    computer choosed 
        <img src="img/${computerChoice}-emoji.png" class="move-icon computer-choice-icon">`;
    document.querySelector('.js-result').innerHTML = `${result}`;
    
    // Check if game is over
    if (currentRound === totalRounds) {
        setTimeout(() => {
            document.querySelector('.js-result').innerHTML = `Game Over! Final Score - Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties} <br> Wanna play again?`;
            gameActive = false;
        }, 1000);
    }
}, 1000);

    document.querySelector('.js-round').innerHTML = `Round: ${currentRound}/${totalRounds}`;
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.js-round').innerHTML = `Round: 0/0`;
    document.querySelector('#rounds-input').value = '0';
    document.querySelector('.player-choice-icon').style.animation = 'none';
    document.querySelector('.computer-choice-icon').style.animation = 'none';
});

function refresh(){
    window.location.reload();
}
function playAgain(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.game-error-msg').innerHTML = '';
    totalRounds = 0;
    currentRound = 0;
    gameActive = false;
    document.querySelector('.js-round').innerHTML = `Round: 0/0`;
    document.querySelector('#rounds-input').value = '0';
    document.querySelector('.js-choose').innerHTML = 
    `You choosed 
        <img src="img/rock-emoji.png" class="move-icon player-choice-icon"> 
    computer choosed 
        <img src="img/rock-emoji.png" class="move-icon computer-choice-icon">`;
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.game-start-msg').innerHTML = '';
    document.querySelector('.player-choice-icon').style.animation = 'none';
    document.querySelector('.computer-choice-icon').style.animation = 'none';
}