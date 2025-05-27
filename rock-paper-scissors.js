let score = JSON.parse(localStorage.getItem('score'))||{
    Wins: 0,
    Loses: 0,
    Ties: 0
}

const scores = document.querySelector('.scores')
const result = document.querySelector('.results')


scores.innerHTML =`Wins:${score.Wins}, Loses:${score.Loses}, Ties:${score.Ties}`

let isAutoplaying = false;
let intervalId ;


function autoPlay() {
    const buttonText = document.querySelector('.autoplay-button');
    if (!isAutoplaying) {
        buttonText.innerHTML = 'Stop';
        intervalId = setInterval(() => {
            const playerMove = computerMove();
            playGame(playerMove);
        }, 1000);
        isAutoplaying = true;
    } else {
        clearInterval(intervalId);
        buttonText.innerHTML = 'Auto Play';
        isAutoplaying = false;
    }
}
document.querySelector('.js-rock-button').addEventListener('click',() =>{
    playGame('Rock');
})
document.querySelector('.js-paper-button').addEventListener('click',() =>{
    playGame('Paper');
})
document.querySelector('.js-scissor-button').addEventListener('click',() =>{
    playGame('Scissors');
})
document.body.addEventListener('keydown', (event) =>{
   if(event.key == 'r'){
    playGame('Rock')
   } 
   else if(event.key == 'p'){
    playGame('Paper')
   }
   else  if(event.key == 's'){
    playGame('Scissors')
   }
});


function playGame(playermove){
    const computermove = computerMove()
    
    document.querySelector('.moves').innerHTML = `You
        <img src="images/${playermove}-emoji.png" class="move-icon">
        <img src="images/${computermove}-emoji.png" class="move-icon">
        Computer`
    if(playermove == computermove){
        score.Ties += 1;
        result.innerHTML = 'Tie.'
        scores.innerHTML = `Wins:${score.Wins}, Loses:${score.Loses}, Ties:${score.Ties}`

    }
    else if ((playermove == 'Rock' && computermove == 'Scissors')||
        (playermove == 'Scissors' && computermove == 'Paper')||
        (playermove == 'Paper' && computermove == 'Rock')){
        score.Wins += 1;
        result.innerHTML = 'You Win.'
        scores.innerHTML = `Wins:${score.Wins}, Loses:${score.Loses}, Ties:${score.Ties}`
    }else{
        score.Loses += 1;
        result.innerHTML = 'You Lose.'


        scores.innerHTML =`Wins:${score.Wins}, Loses:${score.Loses}, Ties:${score.Ties}`
    }
localStorage.setItem('score', JSON.stringify(score));
}
function computerMove(){
    
    const randomNumber = Math.random()
    if (randomNumber <= 1/3){
        return 'Rock'
    }else if(randomNumber <= 2/3){
        return 'Paper'
    }else if(randomNumber > 2/3)
        return 'Scissors'

}function reset(){
    score.Wins = 0
    score.Ties = 0
    score.Loses = 0;
    scores.innerHTML =`Wins:${score.Wins}, Loses:${score.Loses}, Ties:${score.Ties}`
    localStorage.setItem('score', JSON.stringify(score))

}
