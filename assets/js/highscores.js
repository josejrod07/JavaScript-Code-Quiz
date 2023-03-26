var highScoresList = document.querySelector('#highScoresList');
var highScore = JSON.parse(localStorage.getItem('highScore')) || [];

// Prints list of the highest scores onto highscores.html
highScoresList.innerHTML = 
highScore.map(score => {
    return `<li class="highScore">${score.name} - ${score.score}</li>`
}).join('')