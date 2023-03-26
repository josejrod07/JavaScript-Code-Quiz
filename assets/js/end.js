// HTML Elements
var username = document.querySelector('#username');
var saveScore = document.querySelector('#saveScore');
var finalScore = document.querySelector('#finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');

const highScore = JSON.parse(localStorage.getItem('highScore')) || [];

const MAX_HIGH = 5;

// Prints final score into end.html
finalScore.innerText = mostRecentScore;

if (mostRecentScore != "Time's Up! Invalid Score."){
    username.addEventListener('keyup', () => {
        saveScore.disabled = !username.value;
})
}

// Saves the high score in the local storage by username and score

saveHigh = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScore.push(score);

    highScore.sort ((a,b) => {
        return b.score - a.score;
    })
    
    highScore.splice(MAX_HIGH);

    localStorage.setItem('highScore', JSON.stringify(highScore));
    window.location.assign('./end.html');
    
}