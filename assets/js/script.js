const timerPara = document.getElementById("timer");
const highscoresLink = document.getElementById("highscores");
const quiz = document.getElementById("quiz");
const questionH1 = document.querySelector("#quiz h1");
const startBtn = document.getElementById("startBtn");


const questionSet = [
    {question: "The first argument in the setInterval() function, is what kind of function?", 
    answer: "callback",
    option1: "anonymous", option2: "callback", option3: "arrow", option4: "standard"},
    {question: "Is this going to work?", answer: "hopefully", option1: "yes", option2: "no", option3: "hopefully", option4: "no idea"}
];
const answers = [];
let timerInterval;
let timer = 90;
let score = 0;
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
            ansHolders[i].setAttribute("data-correct", "true");
        } else {
            ansHolders[i].innerHTML = `<span style="background-color: purple; padding: 4px 10px; border-radius: 6px;" data-correct="false">${questionSet[currentIndex][`option${i+1}`]}</span`;
            ansHolders[i].setAttribute("data-correct", "false");
        }
    }
}

const endQuiz = () => {
    clearInterval(timerInterval);
    questionH1.textContent = `Your score is ${score}!`;
    document.body.style.textAlign = "center";
    document.querySelector("ol").remove();
}

const saveScore = () => {
    
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
    const feedbackArea = document.querySelector("#quiz p");
    feedbackArea.style.visibility = "visible";
    if (e.target.dataset.correct === "true") {
        score += 1;
        feedbackArea.textContent = "Correct";
    } else {
        timer -= 10;
        feedbackArea.textContent = "Wrong"
    }

    setTimeout(() => { 
        feedbackArea.textContent = "";
        feedbackArea.style.visibility = "hidden";
    }, 500);
    
    if (currentIndex === (questionSet.length - 1)) {
        endQuiz();
    } else {
        currentIndex++;
        displayNextQuestion();
    }
});



let displayScores = () => console.log("here");

highscoresLink.addEventListener("click", displayScores);