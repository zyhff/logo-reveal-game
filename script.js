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
  const teamName = localStorage.getItem('teamName');
  const hasPlayed = localStorage.getItem('hasPlayed'); // Check if the player has already completed the game

  if (!teamName) {
    window.location.href = 'index.html';
  }

  if (hasPlayed) {
    alert("لقد أكملت اللعبة بالفعل ولا يمكنك اللعب مرة أخرى!");
    window.location.href = 'index.html'; // Redirect if they already played
  }

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
  const teamName = localStorage.getItem('teamName');
  
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboard.push({ teamName, time: elapsedTime });
  leaderboard.sort((a, b) => a.time - b.time);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

  localStorage.setItem('hasPlayed', true); // Set flag that the player has played the game

  showLeaderboard();
}

// Show the leaderboard
function showLeaderboard() {
  document.getElementById('leaderboard').style.display = 'block';
  const leaderboardList = document.getElementById('leaderboardList');
  leaderboardList.innerHTML = '';

  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboard.forEach((entry, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${entry.teamName} - ${entry.time} ثواني`;
    leaderboardList.appendChild(listItem);
  });
}

// Reset the game
function resetGame() {
  window.location.href = 'index.html';
}

// Function to clear the leaderboard
function clearLeaderboard() {
  if (confirm("هل أنت متأكد أنك تريد مسح قائمة المتصدرين؟")) {
    localStorage.removeItem('leaderboard'); // Clear leaderboard from localStorage
    document.getElementById('leaderboardList').innerHTML = ''; // Clear the display of the leaderboard
    alert("تم مسح قائمة المتصدرين!");
  }
}

// Function to show the clear leaderboard button for admin access
function adminAccess() {
  const adminPassword = prompt("أدخل كلمة المرور للمدير:");
  
  // Admin password set to 'elyas'
  if (adminPassword === 'elyas') {
    document.getElementById('clearBtn').style.display = 'block'; // Show clear leaderboard button
    alert("تم تفعيل الوصول إلى المدير.");
  } else {
    alert("كلمة مرور غير صحيحة!");
  }
}
