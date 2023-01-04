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
let timer = 90;
let score = 0;
let currentIndex = 0;

startBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    setQuiz();
    const timerInterval = setInterval(function(){
        if (timer >= 0) {
            timerPara.textContent = `Time: ${timer}`;
            timer--;
        } else {
            console.log("Done");
            clearInterval(timerInterval);
        }
    }, 1000);
});

function setQuiz() {
    document.querySelector("body").style.textAlign = "left";
    document.querySelector("#quiz p").remove();
    startBtn.remove();
    createAnswerList();
}

function createAnswerList() {
    var answerList = document.createElement("ol");
    answerList.setAttribute("id", "answers");
    quiz.appendChild(answerList);
    var ans1 = document.createElement("li");
    ans1.setAttribute("id", "ans1");
    var ans2 = document.createElement("li");
    ans2.setAttribute("id", "ans2");
    var ans3 = document.createElement("li");
    var ans4 = document.createElement("li");
    answerList.append(ans1, ans2, ans3, ans4);

    answerList.setAttribute("style", "list-style: none;");

    const liArray = document.querySelectorAll("#answers li");
    for (let i = 0; i < liArray.length; i++) {
        liArray[i].setAttribute("style", "margin: 5px auto; color: white; padding: 2px 6px; border-radius: 6px;");
    }

    displayNextQuestion();
}


function displayNextQuestion() {
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



quiz.addEventListener("click", function(e) {
    if (e.target.dataset.correct === "true") {
        score += 1;
    } else {
        timer -= 10;
    }
    
    if (currentIndex === (questionSet.length - 1)) {
        questionH1.textContent = `Your score is ${score}!`;
        document.body.style.textAlign = "center";
        document.querySelector("ol").remove();
    } else {
        currentIndex++;
        displayNextQuestion();
    }
});

let displayScores = () => console.log("here");

highscoresLink.addEventListener("click", displayScores);