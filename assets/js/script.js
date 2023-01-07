const timerPara = document.getElementById("timer");
const highscoresLink = document.getElementById("highscores");
const quiz = document.getElementById("quiz");
const questionH1 = document.querySelector("#quiz h1");
const startBtn = document.getElementById("startBtn");


const questionSet = [
    {question: "The first argument in the setInterval() function, is what kind of function?", 
    answer: "callback",
    option1: "anonymous", option2: "callback", option3: "arrow", option4: "standard"},
    {question: "Is this going to work?", answer: "hopefully", option1: "yes", option2: "no", option3: "hopefully", option4: "no idea"},
    {question: "Is this student going to find success in programming?", answer: "absolutely", option1: "absolutely", option2: "maybe", option3: "no", option4: "probably not"},
    {question: "How many planets are in the solar system?", answer: "8 if you want to be technical", option1: "no idea", option2: "1", option3: "8 if you want to be technical", option4: "9, pluto still counts"},
    {question: "What is the correct way to peel a banana?", answer: "from the bottom", option1: "from the bottom", option2: "from the top", option3: "i dont eat bananas", option4: "there is no correct way"}
];

const scores = JSON.parse(localStorage.getItem("scores") || '[]');
let timerInterval;
let timer = 90;
let currentScore = 0;
let currentIndex = 0;


const setQuiz = () => {
    document.querySelector("body").style.textAlign = "left";
    document.querySelector("#quiz p").remove();
    startBtn.remove();
    createAnswerList();
}

const createAnswerList = () => {
    const answerList = document.createElement("ol");
    answerList.setAttribute("id", "answers");
    quiz.appendChild(answerList);

    const ansFeedback = document.createElement("p");
    ansFeedback.setAttribute("style", "padding-top: 14px; margin-top: 14px; border-top: 1px solid black; visibility: hidden;");
    quiz.appendChild(ansFeedback);

    const ans1 = document.createElement("li");
    const ans2 = document.createElement("li");
    const ans3 = document.createElement("li");
    const ans4 = document.createElement("li");

    answerList.append(ans1, ans2, ans3, ans4);

    const liArray = document.querySelectorAll("#answers li");
    for (let i = 0; i < liArray.length; i++) {
        liArray[i].setAttribute("style", "margin: 5px auto; color: white; padding: 2px 6px; border-radius: 6px;");
    }

    answerList.setAttribute("style", "list-style: none;");

    displayNextQuestion();
}

const displayNextQuestion = () => {
    questionH1.textContent = questionSet[currentIndex].question;
    const ansHolders = document.querySelectorAll("#quiz li");
    for (let i = 0; i < ansHolders.length; i++) {
        if (questionSet[currentIndex].answer === questionSet[currentIndex][`option${i+1}`]) {
            ansHolders[i].innerHTML = `<span style="background-color: purple; padding: 4px 10px; border-radius: 6px;" data-correct="true">${questionSet[currentIndex][`option${i+1}`]}</span`;
        } else {
            ansHolders[i].innerHTML = `<span style="background-color: purple; padding: 4px 10px; border-radius: 6px;" data-correct="false">${questionSet[currentIndex][`option${i+1}`]}</span`;
        }
    }
}

const endQuiz = () => {
    clearInterval(timerInterval);
    questionH1.textContent = `Your score is ${currentScore}!`;
    document.body.style.textAlign = "center";
    document.querySelector("ol").remove();
    document.querySelector('#quiz p').remove();
    saveScore();
}

const saveScore = () => {
    // Add new p tag for instructions and input 
    const instructions = document.createElement('p');
    instructions.textContent = "Enter your intials to save your score.";
    const initialsField = document.createElement('input');
    initialsField.type = "text";
    initialsField.style.display = "block";
    initialsField.style.margin = "6px auto";
    const submitBtn  = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";

    quiz.append(instructions, initialsField, submitBtn);

    submitBtn.addEventListener("click", function() {
        const currentAttempt = {
            initials: initialsField.value,
            score: currentScore
        };
        scores.push(currentAttempt);
        localStorage.setItem("scores", JSON.stringify(scores));
        displayScores(true, scores);
    });

}

const displayScores = (endOfQuiz, scoreArr = scores) => {
    const allScores = scoreArr;
    questionH1.textContent = "Scores";
    document.querySelector('#quiz p').remove();
    if (endOfQuiz) {
        document.querySelector("#quiz input").remove();
    } 
    const scoresList = document.createElement('ol');
    
    for (let i = 0; i < scores.length; i++) {
        let initials = scores[i].initials;
        let score = scores[i].score;
        let li = document.createElement('li');
        li.textContent = `${initials}: ${score}`;
        scoresList.appendChild(li);
    }

    quiz.insertBefore(scoresList, quiz.children[1]);

    document.querySelector('#quiz button').remove();

    const retakeBtn = document.createElement('button');
    retakeBtn.textContent = "Retake Quiz";
    retakeBtn.type = "button";
    retakeBtn.addEventListener('click', function() {
        location.reload();
    });

    const clearBtn = document.createElement('button');
    clearBtn.textContent = "Clear Scores";
    clearBtn.type = "button";
    quiz.append(retakeBtn, clearBtn);
    clearBtn.addEventListener('click', removeScores);
};

const removeScores = () => {
    scores.splice(0, scores.length);
    localStorage.setItem('scores', scores);
    document.querySelector('#quiz ol').remove();
    
}

startBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    setQuiz();
    timerInterval = setInterval(function(){
        if (timer >= 0) {
            timer--;
            timerPara.textContent = `Time: ${timer}`;
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
});

quiz.addEventListener("click", function(e) {
    if (e.target.matches('span')) {
        const feedbackArea = document.querySelector("#quiz p");
        feedbackArea.style.visibility = "visible";
        if (e.target.dataset.correct === "true") {
            currentScore += 1;
            feedbackArea.textContent = "Correct";
        } else {
            timer -= 10;
            feedbackArea.textContent = "Wrong"
        }
    
        setTimeout(() => { 
            feedbackArea.textContent = "";
            feedbackArea.style.visibility = "hidden";
        }, 1000);
        
        if (currentIndex === (questionSet.length - 1)) {
            endQuiz();
        } else {
            currentIndex++;
            displayNextQuestion();
        }
    }
});

highscoresLink.addEventListener("click", function() {
    displayScores(false);
});