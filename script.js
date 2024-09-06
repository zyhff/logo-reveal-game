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

// End the game and display the logo summary
function endGame() {
  clearInterval(timerInterval);
  document.getElementById('questionArea').style.display = 'none'; // Hide question and buttons
  document.getElementById('timer').style.display = 'none'; // Hide timer
  document.getElementById('statusMessage').textContent = ''; // Clear status message

  // Show the summary
  const summary = `
    <h2>ملخص الشعار</h2>
    <p>
      يمثل الشعار شروق الشمس "الفجر" كبداية ليوم جديد وحياة جديدة مليئة بالطاقة والتفاؤل. الأشخاص المتضافرين يمثلون العمل الجماعي والتعاون بين أفراد الفريق التطوعي. 
      اللون البرتقالي يرمز لشروق الشمس ودفء النهار، بينما اللون السماوي يرمز للسلام والنقاء الذي يظهر بعد انكشاف ظلمة الليل.
    </p>
  `;
  const container = document.querySelector('.container');
  const summaryDiv = document.createElement('div');
  summaryDiv.innerHTML = summary;
  container.appendChild(summaryDiv); // Add summary to the page
}
