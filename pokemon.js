
const apiURL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemonId = 0

//const axiosArray = []
const questionArray = []

//pulling information from the form
const quizImageEl = document.querySelector('.quiz__image')
const quizSpanEl = document.querySelectorAll('.quiz__text')
const quizFormEl = document.querySelector('.quiz__form')
const scoreEl = document.querySelector('.score')
const displaySpanEl = document.querySelector('.score__current')
const runningScoreEl = document.querySelector('.running-score')

let currentScore = 0
let numOfClicks = 0

const startButtonEl = document.querySelector('.button')
const quizSectionEl = document.querySelector('.quiz')
const headerEl = document.querySelector('header')

//this function generate a random number to represent a pokemon in the API list
function getRandomNum () {
    let returnValue = 0
    while (returnValue === 0) {
        returnValue = Math.floor(Math.random()*500)
    }
    return returnValue
}

//this function pulls information from the API
function getPokemonObject() {
    axios.get(apiURL+getRandomNum()
    ).then(response => {
        partiallyPopulateQuestionArray(response.data)
        generateOptions()
    })
}

//this section generates three random pokemon for the multiple choice incorrect answers
function generateOptions() {
    Promise.all(
        [axios.get(apiURL+getRandomNum()),
        axios.get(apiURL+getRandomNum()),
        axios.get(apiURL+getRandomNum())]
    ).then( (response) => {
        //console.log("update generate options",questionArray) not run twice
        const lengthIndex = questionArray.length - 1
        populateOptionsInQuestionArray(response, lengthIndex)
        updateQuizCard(numOfClicks)
        
        //console.log("is this run twixe - 2") no
    })
}

//check answer and count score
function quizClickEvent() {
    quizFormEl.addEventListener('submit', (event) => {
        event.preventDefault()
        for (let valLoop = 0; valLoop <=3; valLoop++ ) {
            let checkStatus = event.target.option[valLoop].checked
            if (checkStatus && (quizSpanEl[valLoop].innerText === questionArray[numOfClicks].correctPokemon)) {
                currentScore += 1
            }
            runningScoreEl.innerText = currentScore
        }
        numOfClicks += 1
        console.log("quiz click event",numOfClicks,currentScore)
        event.target.reset()

        //what happens at the end of the quiz
        if (numOfClicks === 10) {
            event.target.reset()
            scoreEl.classList.remove('score--hide')
            displaySpanEl.innerText = `${currentScore}/${numOfClicks}`
            
        }
        getPokemonObject()
    })
}
//this function puts an object into the array
function partiallyPopulateQuestionArray(returnedFromAPI) {
    const questionObject = {}
    questionObject.correctPokemon = returnedFromAPI.species.name
    questionObject.imageSrc = returnedFromAPI.sprites.other['official-artwork'].front_default
    questionArray.push(questionObject)
}

//populates the options for the pokemon
function populateOptionsInQuestionArray(returnedFromAPI, questionIndex) {
    const options = []    
    options.push(questionArray[questionIndex].correctPokemon)
    options.push(returnedFromAPI[0].data.species.name)
    options.push(returnedFromAPI[1].data.species.name)
    options.push(returnedFromAPI[2].data.species.name)
    
    //sorts the array of options to alphabetical so that the option choice is randomized
    options.sort()
    questionArray[questionIndex].options = options
}

//takes information from the array and puts it into the quiz card
function updateQuizCard(arrayIndex) {
    quizImageEl.setAttribute('src', questionArray[arrayIndex].imageSrc)
    for (let updOptLoop = 0; updOptLoop <=3; updOptLoop++ ) {
        quizSpanEl[updOptLoop].innerText = questionArray[arrayIndex].options[updOptLoop]
    }
    //console.log("update quiz card after score update") no
}


//what happens when we click the start button
startButtonEl.addEventListener('click', () =>{
    startButtonEl.classList.add('button--hide')
    headerEl.classList.add('modify-header')
    quizSectionEl.classList.remove('quiz--hide')
    getPokemonObject()
    quizClickEvent()
})


const restartButton = document.querySelector('.score__button')

//what happens when we click the restart button
//it empties the array, and then reloads it and then starts the quiz process all over again.
restartButton.addEventListener('click', () => {
    
    let length = questionArray.length

    for (let empArray = 0; empArray < length; empArray++) {
        questionArray.pop()
    }
    
    startButtonEl.classList.remove('button--hide')
    headerEl.classList.remove('modify-header')
    quizSectionEl.classList.add('quiz--hide')
    scoreEl.classList.add('score--hide')
    numOfClicks = 0
    currentScore = 0
    runningScoreEl.innerText = currentScore

    getPokemonObject()
})