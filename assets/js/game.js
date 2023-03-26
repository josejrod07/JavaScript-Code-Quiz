// HTML Elements
var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
var timerElement = document.querySelector('.timer-count');

// Variable Declaration
var currentQ = {};
var acceptingAnswers = true;
var score = 0;
var questionCount = 0;
var timer;
var timerCount;
var availableQ = [];
var failure = "Time's Up! Invalid Score.";

// Array of questions and their choices
var questions = [
    {
        question: 'What is the difference between == and === in JavaScript?',
        choice1: 'There is no difference.',
        choice2: '"==" compares two values for equality, while "===" compares both value and type for equality.',
        choice3: '"===" compares two values for equality, while "==" compares both value and type for equality.',
        choice4: '"==" is used for assignment, while "===" is used for comparison',
        answer: 2,
    },
    {
        question: 'Which of the following is the correct way to create a new object in JavaScript?',
        choice1: 'const myObj = object.create();',
        choice2: 'const myObj = Object.create();',
        choice3: 'const myObj = new object()',
        choice4: 'const myObj = new Object();',
        answer: 4,
    },
    {
        question: 'What is the purpose of the "event.preventDefault()" method in JavaScript?',
        choice1: 'To stop an event from bubbling up the DOM tree.',
        choice2: 'To stop the default action of an event from occurring.',
        choice3: 'To prevent an element from being displayed on the screen.',
        choice4: 'To prevent a function from executing.',
        answer: 2,
    },
    {

        question: 'Which of the following is the correct way to declare a variable in JavaScript?',
        choice1: 'let myVariable = 10;',
        choice2: 'const myVariable = 10;',
        choice3: 'var myVariable = 10;',
        choice4: 'All of the above are correct.',
        answer: 4,
    },
    {
        question: "Which of the following is true about JavaScript's data types?",
        choice1: 'JavaScript has only one data type.',
        choice2: 'JavaScript has six primitive data types.',
        choice3: 'JavaScript has two primitive data types and four object data types.',
        choice4: 'JavaScript has five primitive data types and one object data type.',
        answer: 2,
    },
]

const POINTS = 100;
const MAX_QUESTIONS = 5;

// Function to start quiz
function startQuiz(){
    questionCount = 0;
    score = 0;
    availableQ = [...questions];
    timerCount = 300;
    startTimer();
    getNew();
}
// Timer function
function startTimer(){
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;

// If timer reaches 0, the quiz ends and an invalid score message is presented in the endpage.
        if (timerCount == 0){
            clearInterval(timer);
            localStorage.setItem('mostRecentScore', failure);
            return window.location.assign('/end.html');
        }
    }, 1000);
}

// Function to get a new quiz question
function getNew(){
/* Conditional if statement: IF there are 0 available questions or the quiz has reached
the maximum amount of questions, THEN store the most recent score in local storage.*/
    if (availableQ.length === 0 || questionCount > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCount++;
    progressText.innerText = 'Question ' + questionCount +' of ' + MAX_QUESTIONS;
    progressBarFull.style.width = (questionCount/MAX_QUESTIONS) * 100 + '%';

    // Randomly selects the upcoming question from the questions index
    const questionsIndex = Math.floor(Math.random() * availableQ.length);
    currentQ = availableQ[questionsIndex];
    question.innerText = currentQ.question;

    
   // Inner text for each choice
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQ['choice' + number];
    })

    // Removes questions from the index after they're used
    availableQ.splice(questionsIndex, 1);

    acceptingAnswers = true
}

// For when any choice is clicked
choices.forEach(choice =>{
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectionChoice = e.target;
        const selectionAnswer = selectionChoice.dataset['number'];

        var apply = selectionAnswer == currentQ.answer ? 'correct' :
        'incorrect'

// If correct answer, increase score by 100
        if(apply === 'correct') {
            incrementScore(POINTS);
        }
// If incorrect answer, decrease time remaining by 60 seconds
        if (apply === 'incorrect'){
            if (timerCount > 60){
            timerCount = timerCount - 60
            }
        }

        selectionChoice.parentElement.classList.add(apply);

        setTimeout(() => {
            selectionChoice.parentElement.classList.remove(apply);
            getNew();

        }, 1000)
    })
})

// Function to increment the total score on the HTML HUD
function incrementScore(num){
    score += num;
    scoreText.innerText = score;
}

// Call to function
startQuiz();