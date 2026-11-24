const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.querySelector('#finalScore');
const username = document.querySelector('#username');
const scoreBtn = document.querySelector('#scoreBtn');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Animate score number counting up
const targetScore = parseInt(mostRecentScore) || 0;
let currentDisplay = 0;
const duration = 1200; // ms
const startTime = performance.now();

function animateScore(now) {
  const elapsed = now - startTime;
  const progress = Math.min(elapsed / duration, 1);
  // ease-out quad
  const eased = 1 - (1 - progress) * (1 - progress);
  currentDisplay = Math.round(eased * targetScore);
  finalScore.innerText = currentDisplay;
  if (progress < 1) {
    requestAnimationFrame(animateScore);
  }
}
requestAnimationFrame(animateScore);

// Choose emoji based on score
const emoji = document.querySelector('.score-emoji');
if (emoji) {
  if (targetScore >= 80) emoji.textContent = '🏆';
  else if (targetScore >= 50) emoji.textContent = '😊';
  else emoji.textContent = '😅';
}

// Enable save button when name is entered
username.addEventListener('keyup', () => {
  scoreBtn.disabled = !username.value.trim();
});

function saveHighScore(e) {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value.trim(),
  };

  highScores.push(score);
  // Sort descending by score
  highScores.sort((a, b) => b.score - a.score);
  // Keep top 5
  highScores.splice(5);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('achievers.html');
}
