const scoresList = document.querySelector('#scoresList') 
const highScores = JSON.parse(localStorage.getItem("highScores")) || []
scoresList.innerHTML = highScores.map(score => {
    return `
        <div class="card shadow-sm mb-3">
            <div class="card-body d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">${score.name}</h5>
                <span class="display-6 fw-bold text-primary">${score.score}</span>
            </div>
        </div>
    `;
}).join("");