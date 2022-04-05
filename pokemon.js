//pull information from the API
//pull image and name for one from API
//pull 3 random names from API

//store name in variable for correct answer
//store all 4 names in an array
//array to populate the options section



//loop for reloading the information related to the image and options
//run the loop once and store all 20 questions into an secondary array(objects - saving each question as an object) - blur the image of the pokemon

//clicking the button
//remove the blur from the image - change the class of the object using javascript (class in scss which has animation removing the blur)
// set an interval ... 
// will validate the options to see if the answer is correct
//highlight the correct one in green ...
// if selected the wrong one ... highlight in red
//variable for keeping score
//set interval
//next question - counter that keeps track of how many times it's clicked
//updates inner text to the next index in the questions array

//place a 20 second limit on each question - active the sequence that would have happened if next question had been selected?

//get the objects from the main page? the form to populate the inner text

//diving deeper (if time permits)
//every time the user clicks submit, there is a bar on the side, which takes the image of the question, the correct answer and the answer that you chose

const apiURL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemonId = 35

const questionArray = []

function getPokemonObject() {
    axios.get(apiURL+getRandomNum())
    .then(response => {
        populateQuestionArray(response.data)
    })
}


function getRandomNum () {
    let returnValue = 0
    while (returnValue === 0) {
        returnValue = Math.floor(Math.random()*500)
    }
    return returnValue
}


function populateQuestionArray(returnedFromAPI) {
    const questionObject = {}
    questionObject.correctPokemon = returnedFromAPI.species.name
    questionObject.imageSrc = returnedFromAPI.sprites.other['official-artwork'].front_default
    questionObject.options = []
    questionObject.options.push(questionObject.correctPokemon)

    Promise.all(
        [axios.get(apiURL+getRandomNum()),
        axios.get(apiURL+getRandomNum()),
        axios.get(apiURL+getRandomNum())]
    )
    .then(response => {
        questionObject.options.push(response[0].data.species.name)
        questionObject.options.push(response[1].data.species.name)
        questionObject.options.push(response[2].data.species.name)
    })

    setTimeout(
        ()=>{
            questionObject.options.sort()
            questionArray.push(questionObject)
        },3000
    )
}

for (let pokemonLoop = 0; pokemonLoop<=19; pokemonLoop++) {
    getPokemonObject()
}



const quizImageEl = document.querySelector('.quiz__image')
const quizSpanEl = document.querySelectorAll('.quiz__text')
const quizFormEl = document.querySelector('.quiz__form')
const scoreEl = document.querySelector('.score')
const displaySpanEl = document.querySelector('.score__current')

let currentScore = 0
let numOfClicks = 0

function updateQuizCard(arrayIndex) {
    quizImageEl.setAttribute('src', questionArray[arrayIndex].imageSrc)
    for (let updOptLoop = 0; updOptLoop <=3; updOptLoop++ ) {
        quizSpanEl[updOptLoop].innerText = questionArray[arrayIndex].options[updOptLoop]
    }

}

setTimeout(() => {
    console.log(questionArray)
    console.log(questionArray[0])
    updateQuizCard(0)
    quizFormEl.addEventListener('submit', (event) => {
        event.preventDefault()
        if (numOfClicks === 9) {
            event.target.reset()
            scoreEl.classList.remove('score--hide')
            displaySpanEl.innerText = `${currentScore}/${numOfClicks+1}`
        } else {
            for (let valLoop = 0; valLoop <=3; valLoop++ ) {
                let checkStatus = event.target.option[valLoop].checked
                if (checkStatus && quizSpanEl[valLoop].innerText === questionArray[numOfClicks].correctPokemon) {
                    //change color to green
                    currentScore += 1
                } else {
                    //change color to red
                }
                event.target.reset()
            }
            
            numOfClicks += 1
            updateQuizCard(numOfClicks)
        }
    })
}, 4000);




const startButtonEl = document.querySelector('.button')
const quizSectionEl = document.querySelector('.quiz')
const headerEl = document.querySelector('header')

console.log(startButtonEl)
console.log(quizSectionEl)
startButtonEl.addEventListener('click', () =>{
    startButtonEl.classList.add('button--hide')
    headerEl.classList.add('modify-header')
    quizSectionEl.classList.remove('quiz--hide')
})

const restartButton = document.querySelector('.score__button')

restartButton.addEventListener('click', () => {
    
    let length = questionArray.length

    for (let empArray = 0; empArray < length; empArray++) {
        questionArray.pop()
    }
    for (let pokemonLoop = 0; pokemonLoop<=19; pokemonLoop++) {
        getPokemonObject()
    }
    
    setTimeout(() =>{
        startButtonEl.classList.remove('button--hide')
        headerEl.classList.remove('modify-header')
        quizSectionEl.classList.add('quiz--hide')
        scoreEl.classList.add('score--hide')
        numOfClicks = 0
        currentScore = 0
        console.log(questionArray)
        updateQuizCard(0)
    }, 4000)
    
})