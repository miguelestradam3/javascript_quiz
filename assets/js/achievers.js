const scoresList = document.querySelector('#scoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

if (highScores.length === 0) {
  scoresList.innerHTML = `
    <li class="leaderboard-empty">
      No scores yet — be the first to play!
    </li>`;
} else {
  scoresList.innerHTML = highScores.map((entry, index) => {
    const medals = ['🥇', '🥈', '🥉'];
    const rankDisplay = medals[index] || (index + 1);
    return `
      <li class="leaderboard-entry" style="animation-delay: ${index * 0.1}s">
        <span class="leaderboard-rank">${rankDisplay}</span>
        <span class="leaderboard-name">${entry.name}</span>
        <span class="leaderboard-score">${entry.score}</span>
      </li>`;
  }).join('');
}
