//Valid words
//
const wordBank = ["ALMOST", "ALONE", "ALONG", "ALREADY", "ANNIVERSARY", "ANNOUNCE", "ANNUAL", "ANOTHER", "ANSWER", "BEFORE", "BEGIN", "BEGINNING", "BEHAVIOR", "BEHIND", "BEING", "BELIEF", "BELIEVE", "BIOLOGICAL", "BIRD", "BIRTH", "BIRTHDAY", "BIT", "BITE", "BLACK", "BLADE", "BLAME", "BLANKET", "BLIND", "BLOCK", "BLOOD", "BLOW", "CERTAIN", "CERTAINLY", "CHAIN", "CHAIR", "CHAIRMAN", "CHALLENGE", "CHAMBER", "CHAMPION", "CHAMPIONSHIP", "CHANCE", "CHANGE", "CHANGING", "CHANNEL", "CHAPTER", "CHARACTER", "DEFENSIVE", "DEFICIT", "DEFINE", "DEFINITELY", "DEFINITION", "DEGREE", "DELAY", "DELIVER", "DELIVERY", "DEMAND", "DEMOCRACY", "DEMOCRAT", "DEMOCRATIC", "DEMONSTRATE", "DEMONSTRATION", "DENY", "DEPARTMENT", "DEPEND", "DEPENDENT", "EDUCATOR", "EFFECT", "EFFECTIVE", "EFFECTIVELY", "EFFICIENCY", "EFFICIENT", "EFFORT", "EGG", "EIGHT", "EITHER", "ELDERLY", "FATE", "FATHER", "FAULT", "FAVOR", "FAVORITE", "FEAR", "FEATURE", "FEDERAL", "FEE", "FEED", "FEEL", "FEELING", "FELLOW", "FEMALE"];
const availableLetters = document.querySelectorAll(".alphabet-button");
function generateRandomNumber() {return Math.floor(Math.random() * wordBank.length-1) + 1;}
const x = generateRandomNumber();
const chosenWord = wordBank[x]; //Word to guess

let hangmanStage = 0; //How many incorrect guesses have been made
let hasWon = false;
let countNumberMatched = 0;


document.addEventListener('DOMContentLoaded', () => {
    availableLetters.forEach(letter => letter.addEventListener('click', handleAvailableLetterClick));
});

displayWordToGuess();
progressHangmanStage(hangmanStage);
hangmanStage++;

function displayWordToGuess(){
    for (let x = 0; x < chosenWord.length; x++){
        let letter = chosenWord[x];
        if(letter === " "){
            addLetterBoxToDom(true);
        }
        else{
            addLetterBoxToDom(false, x);
        }
    }
}

function displayWinMessage(){
    let gameContainer = document.querySelector('#game-container');

    let newDiv = document.createElement('div');
    newDiv.id = "winner"
    newDiv.textContent = "Winner!";
    newDiv.style.color = "green";
    newDiv.style.fontSize = "20px";
    let newDiv2 = document.createElement('div');
    newDiv2.id = "refresh"
    newDiv2.textContent = "Refresh the page to restart";
    newDiv2.style.color = "black";
    newDiv2.style.fontSize = "16px";
    gameContainer.appendChild(newDiv);
    gameContainer.appendChild(newDiv2);
}

function displayLoseMessage(){
    let gameContainer = document.querySelector('#game-container');

    let newDiv = document.createElement('div');
    newDiv.id = "loser"
    newDiv.textContent = "Game Over!";
    newDiv.style.color = "red";
    newDiv.style.fontSize = "20px";
    let newDiv2 = document.createElement('div');
    newDiv2.id = "refresh"
    newDiv2.textContent = "Refresh the page to restart";
    newDiv2.style.color = "black";
    newDiv2.style.fontSize = "16px";
    gameContainer.appendChild(newDiv);
    gameContainer.appendChild(newDiv2);
}

//Creates blank space for letter of the words to
//go once the user has guessed.
//
function addLetterBoxToDom(blank, letterPositionInWord){
    const parentElement = document.querySelector('#word-to-be-guessed');
    if(blank === true){
        const newDiv = document.createElement('div');
        newDiv.classList.add('letter-box-empty');
        parentElement.appendChild(newDiv);
    }
    else{
        const newDiv = document.createElement('div');
        newDiv.classList.add('letter-box');
        newDiv.id = "letter-box-" + letterPositionInWord;
        parentElement.appendChild(newDiv);
    }


}

function handleAvailableLetterClick(event){
    if(hangmanStage !== 7 && hasWon === false) {

        const clickedLetter = event.target.textContent;
        let matched = false;

        //Validateds whether letter guessed was in chosen word
        //
        for (let x = 0; x < chosenWord.length; x++) {
            if (clickedLetter === chosenWord[x]) {
                countNumberMatched++;
                const editLetterBox = document.querySelector('#letter-box-' + x);
                editLetterBox.textContent = chosenWord[x].toString();
                matched = true;
            }
        }
        if (matched === false) {
            progressHangmanStage(hangmanStage);
            hangmanStage++;
        }

        addLetterToUsedList(clickedLetter);
        removeLetterFromAvailableLetters(clickedLetter);
        if (countNumberMatched === chosenWord.length){
            displayWinMessage();
            hasWon=true;
        }
        if(hangmanStage === 7){
            displayLoseMessage();
        }
    }
}

function removeLetterFromAvailableLetters(letterToRemove){
    availableLetters.forEach(letter => {
        if (letter.textContent === letterToRemove) {
            letter.remove();
        }
    });
}

function addLetterToUsedList(letterToAdd){
    const usedBank = document.querySelector('#already-guessed-letters');

    const newDiv = document.createElement('div');
    newDiv.classList.add('guessed-letter');
    newDiv.textContent = letterToAdd;

    usedBank.appendChild(newDiv);
}

function progressHangmanStage(stage){
    const hangmanDisplay = document.querySelector('#hangman');
    const hangmanImg = hangmanDisplay.querySelector('img');

    if (!hangmanImg) {
        // If there's no img element inside #hangman, create one
        const newHangmanImg = document.createElement('img');
        newHangmanImg.src = `../assets/stage${stage}.png`;
        hangmanDisplay.appendChild(newHangmanImg);
    } else {
        // If there's already an img element, update its src attribute
        hangmanImg.src = `../assets/stage${stage}.png`;
    }
}