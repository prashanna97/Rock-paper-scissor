let score = JSON.parse(localStorage.getItem('score'));

if(!score){   //if no score in local storage default value
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
}
updateScoreElement();
document.querySelector('.js-score').style.fontSize = '20px';

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `wins : ${score.wins}, losses : ${score.losses}, ties: ${score.ties}`;
}

//Function to play Rock, Paper, Scissors
function playGame(playerChoice) {
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


localStorage.setItem('score', JSON.stringify(score)); // Save score to local storage and local storage only supports strings so we convert the object "score " to string using JSON.stringify
updateScoreElement();
//alert(`computer picked ${computerChoice}. you picked ${playerChoice}. ${result} \n Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
document.querySelector('.js-choose').innerHTML = 
`You choosed 
    <img src="img/${playerChoice}-emoji.png" class="move-icon"> 
computer choosed 
    <img src="img/${computerChoice}-emoji.png" class="move-icon">`;
document.querySelector('.js-result').innerHTML = `${result}`;
}