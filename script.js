const questions = [
  { 
    question: "ما هي المجموعة التي تعمل بدون مقابل من أجل خدمة المجتمع وتحقيق الأثر الإيجابي؟", 
    answers: ["الفريق التطوعي", "الفريق الرياضي", "الفريق العسكري"], 
    correct: 0 
  },
  { 
    question: "ما هو الوقت الذي يُعلن بداية اليوم ويظهر بعد إنتهاء الليل مباشرة؟", 
    answers: ["الغروب", "الفجر", "الظهر"], 
    correct: 1 
  },
  { 
    question: "ما هو النجم المضيء الذي يظهر في السماء كل صباح وينير الأرض؟", 
    answers: ["نجم سهيل", "نجم سيريوس", "الشمس"], 
    correct: 2 
  },
  { 
    question: "ما هما اللونان اللذان يزينان السماء والشمس عند بزوغ الفجر؟", 
    answers: ["الأصفر الأحمر", "الأسود السماوي", "الأصفر السماوي"], 
    correct: 2 
  },
];

const logoParts = [
  document.getElementById("part1"),
  document.getElementById("part2"),
  document.getElementById("part3"),
  document.getElementById("part4")
];

let currentQuestionIndex = 0;
let timerInterval;
let startTime;

window.onload = function () {
  loadNextQuestion();
  startTimer();
};

// Start the timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `الوقت: ${elapsedTime} ثواني`;
  }, 1000);
}

// Load next question and show choices
function loadNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = currentQuestion.question;

    const choicesButtons = document.querySelectorAll('.choice');
    choicesButtons.forEach((button, index) => {
      button.textContent = currentQuestion.answers[index];
    });

  } else {
    endGame();
  }
}

// Check the answer
function submitAnswer(selectedIndex) {
  const correctSound = document.getElementById('correctSound');
  const wrongSound = document.getElementById('wrongSound');
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedIndex === currentQuestion.correct) {
    correctSound.play();
    logoParts[currentQuestionIndex].style.opacity = 1;
    currentQuestionIndex++;
    loadNextQuestion();
  } else {
    wrongSound.volume = 0.1; // Adjust the volume of wrong sound
    wrongSound.play();
  }
}

// End the game
function endGame() {
  clearInterval(timerInterval);
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById('timer').textContent = `الوقت الكلي: ${elapsedTime} ثواني`;
}
