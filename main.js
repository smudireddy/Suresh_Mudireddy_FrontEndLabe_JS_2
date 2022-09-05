var questions_data = [
   {
        question:"Which is the smallest state of India?",
        answerOptions:[
            { 
                optionName:"a",
                value:"Delhi"
            },
            { 
                optionName:"b",
                value:"Goa"
            },
            { 
                optionName:"c",
                value:"Pudhicherry"
            },
            { 
                optionName:"d",
                value:"Utterakand"
            }
        ],
        answer:"b"
   },
   {
        question:"Which is the most populated state of India?",
        answerOptions:[
            { 
                optionName:"a",
                value:"Madhyapradesh"
            },
            { 
                optionName:"b",
                value:"Maharastra"
            },
            { 
                optionName:"c",
                value:"Rajasthan"
            },
            { 
                optionName:"d",
                value:"Utterpradesh"
            }
        ],
        answer:"d"
    },
    {
        question:"Which is the biggest state of India?",
        answerOptions:[
            { 
                optionName:"a",
                value:"Utterpradesh"
            },
            { 
                optionName:"b",
                value:"Maharastra"
            },
            { 
                optionName:"c",
                value:"Rajasthan"
            },
            { 
                optionName:"d",
                value:"West Bengal"
            }
        ],
        answer:"c"
    },
    {
        question:"Which is the largest UT of India?",
        answerOptions:[
            { 
                optionName:"a",
                value:"Delhi"
            },
            { 
                optionName:"b",
                value:"Daman"
            },
            { 
                optionName:"c",
                value:"Andaman"
            },
            { 
                optionName:"d",
                value:"Kashmir"
            }
        ],
        answer:"c"
    },
    {
        question:"Which is the capital India?",
        answerOptions:[
            { 
                optionName:"a",
                value:"Delhi"
            },
            { 
                optionName:"b",
                value:"Hyderabad"
            },
            { 
                optionName:"c",
                value:"Bangalore"
            },
            { 
                optionName:"d",
                value:"Noida"
            }
        ],
        answer:"a"
    }
];

let score = 0;
let question_index = 0;
let quizCompleted = false;

function getQuestionByIndex () {
    return questions_data[question_index];
}

function loadQuestion() {
   
    updateQuestionsCompletionCount();

    let question = getQuestionByIndex();
    
    document.getElementById("question").innerText = question.question;

    question.answerOptions.forEach((item) => {
        document.getElementsByName(item.optionName)[0].innerText = item.value;
    });
}

function updateQuestionsCompletionCount() {
    if(question_index < questions_data.length) {
        document.getElementById("questions-stat").innerText = question_index + " of " + questions_data.length;
    }
}


function goToNextQuestion() {
   
    question_index++;
    if(question_index >= questions_data.length) {
        quizCompleted = true;
        onQuizCompleted();
    }
    else {
        loadQuestion();
    }
}

function validateAnser(selectedAnswerOption) { 
    let question = getQuestionByIndex();
    if(question.answer === selectedAnswerOption) {
        score++;
    }
}

function questionAnswered(event) {
    var selectedElement =  event.target;

    console.log(selectedElement.attributes["name"].value);
    validateAnser(selectedElement.attributes["name"].value);
    goToNextQuestion(event.target);
}

function onQuizCompleted() {
    removeEventListenres();
    showQuizScoreCard();
}

function displayStatusByScore() {
    switch(score) {
        case 5: {
            document.getElementById("quiz-result").innerText = "Excellent!";
        }
        break;
        case 4:
            {
                document.getElementById("quiz-result").innerText = "Very Good!"
            }
            break;
        case 3:
            {
                document.getElementById("quiz-result").innerText = "Good!"
            }
            break;
        case 2:
            {
                document.getElementById("quiz-result").innerText = "Need improvement!";
                document.getElementById("quiz-result").style.color = "red";
            }break;
        default:
            {
                document.getElementById("quiz-result").innerText = "Poor!";
                document.getElementById("quiz-result").style.color = "red";
            }break;
    }
}


function showQuizScoreCard() {
   document.getElementById("quiz-card-container").remove();
   document.getElementById("quiz-result-container").style.visibility = "visible";

   displayStatusByScore();
   document.getElementById("quiz-score").innerText = " You scored " + ((score/questions_data.length)*100)+"%";
}


function addEventListenres() {
    Array.from(document.querySelectorAll(".answer-item p")).forEach((element) => {
        element.addEventListener("click", questionAnswered);
    });
}

function removeEventListenres() {
    Array.from(document.querySelectorAll(".answer-item p")).forEach((element) => {
        element.removeEventListener("click", questionAnswered);
    });
}

function startQuiz() {

    document.getElementById("quiz-result-container").style.visibility = "hidden";

    addEventListenres();
    loadQuestion();
}




