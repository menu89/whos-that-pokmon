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
    axios.get(apiURL+pokemonId)
    .then(response => {
        console.log(response)
        console.log(response.data.species.name)
        const intermediaryVariable =  response.data.sprites.other['official-artwork'].front_default
        console.log(intermediaryVariable)
        populateQuestionArray(response.data)
    })
}


function getRandomNum () {
    return Math.floor(Math.random()*100)
}


function populateQuestionArray(returnedFromAPI) {
    const questionObject = {}
    questionObject.correctPokemon = returnedFromAPI.species.name
    questionObject.imageSrc = returnedFromAPI.sprites.other['official-artwork'].front_default
    questionObject.incorrectAnswers = []
    for (let i=0; i <=2; i++) {
        axios.get(apiURL+getRandomNum())
        .then(response => {
            randomName = response.data.species.name
            questionObject.incorrectAnswers.push(randomName)
        })
    }
    console.log(questionObject)

    questionArray.push(questionObject)
    console.log(questionArray)
}




getPokemonObject()