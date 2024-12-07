// TRANSITIONING TO QUIZ SCREEN

let playButton = document.querySelector("#startQuizButton");
let landingPage = document.querySelector("#landingPage");
let quizContainer = document.querySelector("#quizContainer")
playButton.addEventListener("click", () => {
    landingPage.classList.add("hidden");
    quizContainer.classList.remove("hidden");
})

// QUIZ FUNCTIONALITY 

let quizQuestion = document.querySelector("#question");
let nextButton = document.querySelector("#nextButton");
let optionButtons = document.querySelectorAll(".option-btn");
let currentQuestionIndex = 0;
let totalScore = 0;

function loadQuestion() {
    quizQuestion.innerText = quiz[currentQuestionIndex]["question"];
    let optButtonList = Array.from(optionButtons);
    optButtonList.forEach((button, index) => {
        button.disabled = false;
        button.classList.remove("correct", "incorrect");
        button.innerText = quiz[currentQuestionIndex]["options"][index];
        nextButton.disabled = true;
        nextButton.style.opacity = 0.5;
    });
}


// HANDLING THE QUIZ OPTIONS

let optButtonList = Array.from(optionButtons);
optButtonList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        userOption = e.target.innerText;
        if (userOption === quiz[currentQuestionIndex]["answer"]) {
            e.target.classList.add("correct");
            totalScore++;
        }
        else {
            e.target.classList.add("incorrect");
        }
        optButtonList.forEach((button) => {
            button.disabled = true;
        });

        nextButton.disabled = false;
        nextButton.style.opacity = 1;

    });
});

// PROCEEDS TO NEXT QUESTION

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        loadQuestion();
    } else if (currentQuestionIndex >= quiz.length) {
        quizQuestion.innerText = `Quiz Completed! Your Score: ${totalScore}/${quiz.length}`;
        document.querySelector(".navigation").appendChild(playAgainButton());
        nextButton.remove();
        optionButtons.forEach((button) => {
            button.style.display = "none";
        });
    }
    else if (currentQuestionIndex <= quiz.length - 1) {
        nextButton.innerText = "SHOW TOTAL SCORE";
    }
});

function playAgainButton() {
    let playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("id", "playAgainBtn");
    playAgainBtn.addEventListener("click", () => {
        totalScore = 0;
        currentQuestionIndex = 0;
        optionButtons.forEach((button) => {
            button.style.display = "block";
        });
        nextButton.disabled = true;
        nextButton.style.opacity = 0.5;
        document.querySelector(".navigation").appendChild(nextButton);
        playAgainBtn.remove();
        loadQuestion();
    });
    playAgainBtn.innerText = "Play Again";
    return playAgainBtn;
}

loadQuestion();
