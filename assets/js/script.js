const timerPara = document.getElementById("timer");
const highscoresLink = document.getElementById("highscores");
const questionH1 = document.querySelector("section h1");
const startBtn = document.getElementById("startBtn");


const questionSet = [
    {question: "The first argument in the setInterval() function, is what kind of function?", 
    answer: "callback",
    option1: "anonymous", option2: "callback", option3: "arrow", option4: "standard"}
];
const answers = [];
let timer = 90;
let score = 0;
let currentIndex = 0;

startBtn.addEventListener("click", function() {
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
    document.querySelector("section p").remove();
    startBtn.remove();
    createAnswerList();
    displayNextQuestion();
}

function createAnswerList() {
    var answerList = document.createElement("ol");
    var ans1 = document.createElement("li");
    var ans2 = document.createElement("li");
    var ans3 = document.createElement("li");
    var ans4 = document.createElement("li");
}

function displayNextQuestion() {
    questionH1.textContent = questionSet[currentIndex].question;
}


let displayScores = () => console.log("here");

highscoresLink.addEventListener("click", displayScores);
