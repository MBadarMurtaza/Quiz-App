const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which is the largest mountain in the world?",
    answers: [
      { text: "K2", correct: false },
      { text: "Himalaya", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Karakoram", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector(".question");
const answerButtons = document.querySelectorAll(".answer");
const nextButton = document.querySelector(".last");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  nextButton.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((ans, index) => {
    const button = answerButtons[index];
    button.textContent = ans.text;
    button.classList.remove("bg-green-500", "bg-red-500");
    button.disabled = false;
    button.dataset.correct = ans.correct;
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  answerButtons.forEach((button) => {
    button.style.display = "block"; // Ensure buttons are visible
    button.disabled = false; // Re-enable buttons
  });
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("bg-green-500");
    score++;
  } else {
    selectedButton.classList.add("bg-red-500");
  }
  answerButtons.forEach((button) => {
    button.disabled = true;
  });
  nextButton.classList.remove("hidden");
}

function handleNextButton() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  answerButtons.forEach((button) => (button.style.display = "none"));
  nextButton.textContent = "Restart";
  nextButton.removeEventListener("click", handleNextButton); // Remove old event listener
  nextButton.addEventListener("click", restartQuiz); // Add new event listener for restart
}

function restartQuiz() {
  answerButtons.forEach((button) => (button.style.display = "block")); // Show buttons again
  startQuiz(); // Restart the quiz
}

// Initial event listener for the "Next" button
nextButton.addEventListener("click", handleNextButton);

startQuiz();
