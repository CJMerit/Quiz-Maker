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
    {question: 'This attribute is unique and can only be used once in the HTML file.',
    options: ['id', 'class', 'href', 'src'], correct: 1},
    {question: 'Which of these can be used as selectors in CSS?',
    options: ['class', 'id', 'element', 'all of these'], correct: 4},
    {question: 'This sets the boldness of the font in CSS.',
    options: ['font-size', 'font-weight', 'line-height', 'font-family'], correct: 2},
    {question: 'In CSS, this sets the font color of the selected HTML item.',
    options: ['color', 'font-family', 'background-color', 'height'], correct: 1},
    {question: 'In CSS, use this to NOT display the selected HTML item.',
    options: ['display: inline', 'display: block', 'display: none', 'display'], correct: 3},
    {question: 'In CSS, use this to NOT display the selected HTML item.',
    options: ['display: inline', 'display: block', 'display: none', 'display'], correct: 3},
    {question: 'In CSS, which of these sets the spacing INSIDE the selected HTML element?',
    options: ['margin', 'padding', 'border', 'line-height'], correct: 2},
    {question: 'In CSS, which of these sets the position relative to the viewport?',
    options: ['position: fixed', 'position: relative', 'position: absolute', 'position: static'], correct: 1},
    {question: 'Which of these is used to make responsive designs in CSS?',
    options: ['@responsive', 'position: relative', 'width', '@media'], correct: 4},
    {question: 'Which of these turns the selected item into a flexbox?',
    options: ['display', 'flex', 'display: flex', 'flexbox'], correct: 3},
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

function highScore() {
    
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
    secondsLeft = secondsLeft + 2;
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
    
    let randQuestion = Math.floor(Math.random() * questions.length);
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
