// Questions and answers data
const questions = [
  { question: "What color is the sun?", answer: "yellow" },
  { question: "What happens at dawn?", answer: "the sun rises" },
  { question: "What color is the sky at sunrise?", answer: "orange" },
  { question: "What is the shape of the sun?", answer: "circle" },
  // Add more questions as needed
];

// Image versions for the reveal
const logoImages = [
  "assets/logo_blurred.png",
  "assets/logo_partial1.png",
  "assets/logo_partial2.png",
  "assets/logo_partial3.png",
  "assets/logo_full.png"
];

let currentQuestionIndex = 0;
let currentImageIndex = 0;

// Initialize game
window.onload = function () {
  loadNextQuestion();
};

// Load the next question
function loadNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    document.getElementById("questionText").textContent = questions[currentQuestionIndex].question;
  } else {
    document.getElementById("questionText").textContent = "You've revealed the full logo!";
    document.getElementById("answerInput").disabled = true;
    document.getElementById("statusMessage").textContent = "Congrats!";
  }
}

// Check if the submitted answer is correct
function submitAnswer() {
  const userAnswer = document.getElementById("answerInput").value.toLowerCase();
  
  if (userAnswer === questions[currentQuestionIndex].answer.toLowerCase()) {
    // Correct answer, reveal part of the logo
    currentImageIndex++;
    if (currentImageIndex < logoImages.length) {
      document.getElementById("logoImage").src = logoImages[currentImageIndex];
      document.getElementById("logoImage").style.animation = "logoReveal 1s ease-in-out forwards"; // Add fade-in animation
    }
    currentQuestionIndex++;
    document.getElementById("answerInput").value = ""; // Clear input
    document.getElementById("statusMessage").textContent = "Correct! Revealing part of the logo...";
    loadNextQuestion();
  } else {
    // Incorrect answer, trigger shake animation
    document.getElementById("answerInput").classList.add("shake");
    document.getElementById("statusMessage").textContent = "Incorrect. Try again!";
    setTimeout(() => {
      document.getElementById("answerInput").classList.remove("shake");
    }, 500); // Remove shake class after animation
  }
}
