// أسئلة وأجوبة
const questions = [
  { question: "ما هو رمز الشمس في الشعار؟", answer: "الشمس" },
  { question: "ما هو معنى الأشخاص المتضافرين في الشعار؟", answer: "العمل الجماعي" },
  { question: "ما هي الألوان الأساسية المستخدمة في الشعار؟", answer: "السمّاوي والبرتقالي" },
  { question: "متى يتم استخدام الألوان الرمادية في الشعار؟", answer: "التعزية" },
  { question: "ما هو نوع الخط العربي المستخدم في الشعار؟", answer: "خط بسيط" },
  { question: "ماذا يرمز اللون البرتقالي في الشعار؟", answer: "شروق الشمس" },
  { question: "ماذا يرمز اللون السمّاوي في الشعار؟", answer: "السلام" },
];

// صور الشعار للكشف التدريجي
const logoImages = [
  "assets/logo_blurred.png",
  "assets/logo_partial1.png",
  "assets/logo_partial2.png",
  "assets/logo_partial3.png",
  "assets/logo_full.png"
];

let currentQuestionIndex = 0;
let currentImageIndex = 0;

// تحميل اللعبة
window.onload = function () {
  loadNextQuestion();
};

// تحميل السؤال التالي
function loadNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    document.getElementById("questionText").textContent = questions[currentQuestionIndex].question;
  } else {
    document.getElementById("questionText").textContent = "تم كشف الشعار بالكامل!";
    document.getElementById("answerInput").disabled = true;
    document.getElementById("statusMessage").textContent = "مبروك!";
  }
}

// التحقق من الإجابة
function submitAnswer() {
  const userAnswer = document.getElementById("answerInput").value.toLowerCase();
  
  if (userAnswer === questions[currentQuestionIndex].answer.toLowerCase()) {
    currentImageIndex++;
    if (currentImageIndex < logoImages.length) {
      document.getElementById("logoImage").src = logoImages[currentImageIndex];
      document.getElementById("logoImage").style.animation = "logoReveal 1s ease-in-out forwards";
    }
    currentQuestionIndex++;
    document.getElementById("answerInput").value = "";
    document.getElementById("statusMessage").textContent = "إجابة صحيحة! يتم كشف جزء من الشعار...";
    loadNextQuestion();
  } else {
    document.getElementById("answerInput").classList.add("shake");
    document.getElementById("statusMessage").textContent = "إجابة خاطئة. حاول مرة أخرى!";
    setTimeout(() => {
      document.getElementById("answerInput").classList.remove("shake");
    }, 500);
  }
}
