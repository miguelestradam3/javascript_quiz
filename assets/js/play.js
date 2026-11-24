let questions = [
  {
    question: "What is the world's most populated country?",
    choice1: 'USA',
    choice2: 'China',
    choice3: 'Russia',
    choice4: 'India',
    choice5: 'Egypt',
    choice6: 'Germany',
    answer: 2,
  },
  {
    question: 'What is the capital of the Philippines?',
    choice1: 'Jakarta',
    choice2: 'Dili',
    choice3: 'Manila',
    choice4: 'Marawi',
    choice5: 'Berlin',
    choice6: 'Cairo',
    answer: 3,
  },
  {
    question: 'The Great Barrier Reef is off the coast of which country?',
    choice1: 'Australia',
    choice2: 'Fiji',
    choice3: 'South Africa',
    choice4: 'New Zealand',
    choice5: 'Egypt',
    choice6: 'Germany',
    answer: 1,
  },
  {
    question: "What is the world's smallest country?",
    choice1: 'USA',
    choice2: 'China',
    choice3: 'Russia',
    choice4: 'Monaco',
    choice5: 'Vatican City',
    choice6: 'Liechtenstein',
    answer: 5,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    choice1: 'Earth',
    choice2: 'Venus',
    choice3: 'Mars',
    choice4: 'Jupiter',
    choice5: 'Saturn',
    choice6: 'Mercury',
    answer: 3,
  },
  {
    question: 'Which ocean is the largest in the world?',
    choice1: 'Atlantic Ocean',
    choice2: 'Indian Ocean',
    choice3: 'Arctic Ocean',
    choice4: 'Southern Ocean',
    choice5: 'Pacific Ocean',
    choice6: 'Mediterranean Sea',
    answer: 5,
  },
  {
    question: 'Who painted the Mona Lisa?',
    choice1: 'Vincent van Gogh',
    choice2: 'Pablo Picasso',
    choice3: 'Michelangelo',
    choice4: 'Leonardo da Vinci',
    choice5: 'Claude Monet',
    choice6: 'Raphael',
    answer: 4,
  },
  {
    question: 'What is the largest mammal on Earth?',
    choice1: 'African Elephant',
    choice2: 'Blue Whale',
    choice3: 'Giraffe',
    choice4: 'Hippopotamus',
    choice5: 'Polar Bear',
    choice6: 'Orca',
    answer: 2,
  },
  {
    question: 'Which gas do plants absorb from the atmosphere?',
    choice1: 'Oxygen',
    choice2: 'Nitrogen',
    choice3: 'Hydrogen',
    choice4: 'Carbon Dioxide',
    choice5: 'Helium',
    choice6: 'Argon',
    answer: 4,
  },
  {
    question: 'Which is the largest continent by land area?',
    choice1: 'Africa',
    choice2: 'Europe',
    choice3: 'North America',
    choice4: 'South America',
    choice5: 'Asia',
    choice6: 'Australia',
    answer: 5,
  }
];

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const question = document.querySelector('#QuestionText');
const choiceTextEls = Array.from(document.querySelectorAll('.ChoiceText'));
const choiceCards = Array.from(document.querySelectorAll('.quiz-choice'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#scorenumber');
const progressBarFull = document.querySelector('#progressBarFull');
const MAX_QUESTIONS = questions.length;
const SCORE_POINTS = 100 / MAX_QUESTIONS;

// ── Start ──────────────────────────────────────────────────────
function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

// ── Next Question ──────────────────────────────────────────────
function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('score.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const idx = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[idx];
  question.innerText = currentQuestion.question;

  // Animate question card
  const card = document.querySelector('.quiz-question-card');
  card.style.animation = 'none';
  card.offsetHeight; // force reflow
  card.style.animation = 'fadeInUp 0.4s ease-out both';

  // Populate choices with staggered animation
  choiceTextEls.forEach((el, i) => {
    const number = el.dataset['number'];
    el.innerText = currentQuestion['choice' + number];

    const parent = choiceCards[i];
    parent.classList.remove('correct', 'incorrect');
    parent.style.animation = 'none';
    parent.offsetHeight;
    parent.style.animation = `fadeInUp 0.35s ease-out ${0.05 * i}s both`;
  });

  availableQuestions.splice(idx, 1);
  acceptingAnswers = true;
}

// ── Click handler on each choice card ──────────────────────────
choiceCards.forEach((card, i) => {
  card.addEventListener('click', () => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const selectedNumber = card.dataset['number'];
    const isCorrect = selectedNumber == currentQuestion.answer;
    const classToApply = isCorrect ? 'correct' : 'incorrect';

    if (isCorrect) {
      incrementScore(SCORE_POINTS);
      Swal.fire({
        icon: 'success',
        title: 'Correct!',
        text: 'Excellent!',
        timer: 1200,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Incorrect!',
        text: `Correct answer: ${currentQuestion['choice' + currentQuestion.answer]}`,
        timer: 1800,
        showConfirmButton: false,
      });
    }

    card.classList.add(classToApply);
    setTimeout(() => {
      card.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// ── Score ───────────────────────────────────────────────────────
function incrementScore(points) {
  score += points;
  scoreText.innerText = Math.round(score);

  // bump animation
  scoreText.classList.remove('bump');
  scoreText.offsetHeight;
  scoreText.classList.add('bump');
}

// ── Tooltip on hover ───────────────────────────────────────────
const tooltip = document.getElementById('tooltip');

choiceCards.forEach(card => {
  card.addEventListener('mouseenter', e => {
    const textEl = card.querySelector('.ChoiceText');
    if (textEl && textEl.dataset.tooltip) {
      tooltip.innerHTML = textEl.dataset.tooltip;
      tooltip.style.display = 'block';
    }
  });
  card.addEventListener('mousemove', e => {
    tooltip.style.left = e.pageX + 12 + 'px';
    tooltip.style.top = e.pageY - 30 + 'px';
  });
  card.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});

// ── Go ─────────────────────────────────────────────────────────
startGame();
