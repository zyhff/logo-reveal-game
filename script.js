// أسئلة وأجوبة متعددة الخيارات
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

// عناصر الشعار المراد كشفها
const logoParts = [
  document.getElementById("part1"),
  document.getElementById("part2"),
  document.getElementById("part3"),
  document.getElementById("part4")
];

let currentQuestionIndex = 0;

// تحميل اللعبة
window.onload = function () {
  loadNextQuestion();
};

// تحميل السؤال التالي وعرض الخيارات
function loadNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("questionText").textContent = currentQuestion.question;
    
    const choicesButtons = document.querySelectorAll(".choice");
    choicesButtons.forEach((button, index) => {
      button.textContent = currentQuestion.answers[index];
    });

  } else {
    document.getElementById("questionText").textContent = "تم كشف الشعار بالكامل!";
    document.querySelectorAll(".choice").forEach(button => button.disabled = true); // Disable buttons
    document.getElementById("statusMessage").textContent = "مبروك!";
  }
}

// التحقق من الإجابة
function submitAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  
  if (selectedIndex === currentQuestion.correct) {
    // كشف جزء من الشعار
    logoParts[currentQuestionIndex].style.opacity = 1;
    
    currentQuestionIndex++;
    document.getElementById("statusMessage").textContent = "إجابة صحيحة! تم كشف جزء من الشعار...";
    loadNextQuestion();
  } else {
    document.getElementById("statusMessage").textContent = "إجابة خاطئة. حاول مرة أخرى!";
  }
}
