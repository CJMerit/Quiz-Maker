let startButton = document.querySelector('#start-button');
let timerEl = document.querySelector('#timer');
let cardTitle = document.querySelector('.card-title');
let cardText = document.querySelector('.card-text');
let card = document.querySelector('#question-card');
let score = document.querySelector('#score');
let answers = [];
let secondsLeft = 120;
let totalScore = 0;
var timerInterval;
const questions = [
    {question: 'What terminal command makes a new directory?',
    options: ['cd', 'ls', 'touch', 'mkdir'], correct: 4},
    {question: 'What is the git command to clone a repo?',
    options: ['git push', 'git clone', 'git repo', 'git pull'], correct: 2},
    {question: 'Which HTML element creates a bullet point list?',
    options: ['ol', 'h1', 'ul', 'p'], correct: 3},
]

function loadInitial() {
    totalScore = 0;
    score.textContent = '';
    timerEl.textContent = '';
    cardTitle.textContent = 'Web Dev Quiz!'
    cardText.setAttribute('style', 'white-space: pre;')
    cardText.textContent = 'Answer some questions about web development. See if you can get a high score! \r\n'
    cardText.textContent += 'Correct answers will add time, but incorrect answers will subtract time!'
    card.appendChild(startButton)
}

function wrongAnswer() {
    secondsLeft = secondsLeft - 10;
    cardText.textContent = 'Incorrect!'
    for ( let i = 0; i < 4; i++) {
        card.removeChild(answers[i])
    }
    if(secondsLeft >= 0) {
        setQuestion();
    }
    else {
        clearInterval(timerInterval);
        loadInitial();
    }
}

function correctAnswer() {
    totalScore++;
    score.textContent = 'Score: ' + totalScore;
    secondsLeft = secondsLeft + 5;
    cardText.textContent = 'Correct!'
    for ( let i = 0; i < 4; i++) {
        card.removeChild(answers[i])
    }
    setQuestion();
}

function setTime() {
    // Sets interval in variable    
    timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if(secondsLeft === 0) {
        // Stops execution of action at set interval
            clearInterval(timerInterval);
        // Calls function to create and append image
            for ( let i = 0; i < 4; i++) {
                card.removeChild(answers[i])
            }
            loadInitial();
        }
  
    }, 1000);
}

function setQuestion() {
    
    let randQuestion = Math.floor(Math.random() * 3);
    cardTitle.textContent = questions[randQuestion].question;
    

    for (let i = 0; i < 4; i++) {
        answers[i] = document.createElement('button');
        answers[i].setAttribute('class', 'btn btn-success w-auto mr-2');
        answers[i].textContent = questions[randQuestion].options[i];
        card.insertBefore(answers[i], cardText);
        if (i + 1 === questions[randQuestion].correct) {
            answers[i].addEventListener('click', correctAnswer);
        }
        else {
            answers[i].addEventListener('click', wrongAnswer);
        }
    }
}

startButton.addEventListener('click', function() {
    //Start Quiz function
    score.textContent = 'Score: ' + totalScore;
    cardText.textContent = '';
    card.removeChild(startButton);
    setTime();
    setQuestion();

})
