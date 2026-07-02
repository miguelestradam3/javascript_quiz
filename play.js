let questions = [
{
	question: 'What is the worl\'ds most populated country?',
	choice1: 'usa',
	choice2: 'china',
	choice3: 'russia',
	choice4: 'india',
	choice5: 'Egypt',
	choice6: 'Germany',
	answer: 2,
},
{
	question: 'What is the capital of the Philippines?',
	choice1: 'Jakarta',
	choice2: 'Dili',
	choice3: 'Manilla',
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
	question: 'What is the world\'s Smallest Country?',
	choice1: 'usa',
	choice2: 'china',
	choice3: 'russia',
	choice4: 'Monaco',
	choice5: 'Vatican City',
	choice6: 'Lichtenstein',
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
}
]
let currentQuestion = {}
let TrueAnswers = true 
let score = 0
let questionCounter = 0 
let availableQuestions = [] 
const question = document.querySelector('#QuestionText');
const choices = Array.from(document.querySelectorAll('.ChoiceText'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#scorenumber');
const progressBarFull = document.querySelector('#progressBarFull');
const MAX_QUESTIONS = questions.length

let SCORE_POINTS = (100/MAX_QUESTIONS)

GetStareted = () => {
	questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}


getNewQuestion = () => {
	 if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('score.html')
}
questionCounter++
progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
const questionsRandNumber = Math.floor(Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsRandNumber]
question.innerText = currentQuestion.question
choices.forEach(choice => {
    const number = choice.dataset['number']
	 choice.innerText = currentQuestion['choice' + number]
    })
availableQuestions.splice(questionsRandNumber, 1)

  TrueAnswers = true
}

const tooltip = document.getElementById("tooltip");

choices.forEach(function(question){

    question.addEventListener("mouseenter", function(){

        tooltip.innerHTML = question.dataset.tooltip;
        tooltip.style.display = "block";

    });

    question.addEventListener("mouseleave", function(){

        tooltip.style.display = "none";

    });

});

choices.forEach(choice => {
    choice.addEventListener('click', e => {
		if(!TrueAnswers) return
			TrueAnswers = false
		const selectedChoice = e.target
		const selectedAnswer = selectedChoice.dataset['number']
		let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if(classToApply === 'correct') {
			incrementScore(SCORE_POINTS)
			alert("Your answer is right")
        } else {
			alert(`The answer was: ${Object.values(currentQuestion)[currentQuestion.answer]}`)
		}
		selectedChoice.parentElement.classList.add(classToApply)
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply)
			           getNewQuestion()
        }, 1000)
    })
})

incrementScore = number  => {
	score +=number
 scoreText.innerText = score
}
GetStareted()









































