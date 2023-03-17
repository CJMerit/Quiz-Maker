let startButton = document.querySelector('#start-button');
let timerEl = document.querySelector('#timer');
let cardTitle = document.querySelector('.card-title');
let cardText = document.querySelector('.card-text');
let card = document.querySelector('#question-card');
let board = document.querySelector('#questions')
let score = document.querySelector('#score');
let viewHS = document.querySelector('#high-scores');
let highScores = [];
let answers = [];
let secondsLeft = 20;
let totalScore = 0;
let timerInterval;
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
    highScores = JSON.parse(localStorage.getItem("highScores"));
    if(viewHS.classList[2] === 'd-none') {
        viewHS.classList.remove('d-none')
    }
    if(!card.classList[4]) {
        card.classList.add('h-75')
    }
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
    cardTitle.textContent = 'Finished!'
    cardText.textContent = 'Enter name:'
    let nameEntry = document.createElement("input")
    nameEntry.setAttribute('type', 'text')
    nameEntry.classList.add('text-group', 'mr-3')
    card.appendChild(nameEntry)
    let submitEntry = document.createElement('button')
    submitEntry.textContent = 'Submit'
    submitEntry.setAttribute('type', 'button')
    submitEntry.classList.add("btn", "btn-success", "w-auto")
    card.appendChild(submitEntry)

    submitEntry.addEventListener('click', function() {
        let name = nameEntry.value;
        let setScore = score.textContent.split(' ')[1];

        if(name && setScore) {
            let newHighScore = {
                name: name,
                score: setScore
            }
            highScores.push(newHighScore)
            localStorage.setItem('highScores', JSON.stringify(highScores))
        }
        card.removeChild(nameEntry)
        card.removeChild(submitEntry)
        loadInitial();
    })

}

function wrongAnswer() {
    secondsLeft = secondsLeft - 5;
    cardText.textContent = 'Incorrect!'
    for ( let i = 0; i < 4; i++) {
        card.removeChild(answers[i])
    }
    if(secondsLeft >= 0) {
        setQuestion();
    }
    else {
        clearInterval(timerInterval);
        highScore();
    }
}

function correctAnswer() {
    totalScore++;
    score.textContent = 'Score: ' + totalScore;
    secondsLeft = secondsLeft + 1;
    cardText.textContent = 'Correct!'
    for ( let i = 0; i < 4; i++) {
        card.removeChild(answers[i])
    }
    setQuestion();
}

function setTime() {
    // Sets interval in letiable    
    timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = 'Time: ' + secondsLeft;

        if(secondsLeft <= 0 ) {
        // Stops execution of action at set interval
            clearInterval(timerInterval);
        // Calls function to create and append image
            for ( let i = 0; i < 4; i++) {
                card.removeChild(answers[i])
            }
            secondsLeft = 20;
            highScore();
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

function viewHighScores() {
    highScores = JSON.parse(localStorage.getItem("highScores"));
    card.classList.remove('h-75')
    let goBack = document.createElement('button')
    goBack.textContent = 'Back'
    goBack.setAttribute('type', 'button')
    goBack.classList.add("btn", "btn-success", "w-auto", 'my-2')
    card.appendChild(goBack)
    card.removeChild(startButton)
    card.removeChild(cardText)
    cardTitle.textContent = 'High Scores!'
    for(let i = 0; i < highScores.length; i++) {
        let highScoreCard = document.createElement('div')
        highScoreCard.classList.add('card', 'light', 'd-block', 'align-items-center', 'row')
        let cardTitleHS = document.createElement('h3')
        cardTitleHS.classList.add('card-title', 'my-2')
        cardTitleHS.textContent = highScores[i].name;
        let cardTextHS = document.createElement('p');
        cardTextHS.classList.add('card-text', 'mb-2');
        cardTextHS.textContent = highScores[i].score
        highScoreCard.appendChild(cardTitleHS);
        highScoreCard.appendChild(cardTextHS);
        board.appendChild(highScoreCard);
    }
    goBack.addEventListener('click', function() {
        event.stopPropagation()

        for(let i = 0; i < highScores.length; i++) {
            board.removeChild(board.children[1])
        }
        card.removeChild(goBack)
        card.appendChild(cardText)
        loadInitial();
    })
}

startButton.addEventListener('click', function() {
    //Start Quiz function
    timerEl.textContent = 'Time: ' + secondsLeft;
    score.textContent = 'Score: ' + totalScore;
    cardText.textContent = '';
    card.removeChild(startButton);
    viewHS.classList.add('d-none')
    setTime();
    setQuestion();

})

viewHS.addEventListener('click', function() {
    event.stopPropagation();
    viewHS.classList.add('d-none');
    viewHighScores();
})
