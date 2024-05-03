//valid word list
//
const birdArray = ["BOOBY", "BRANT", "CRAKE", "CRANE", "DIVER", "EAGLE", "EGRET", "EIDER", "FINCH", "GALAH", "GOOSE", "GREBE", "HERON", "HOBBY", "HOMER", "JUNCO", "MACAW", "MERLE", "MINER", "MUNIA", "MYNAH", "NODDY", "OUSEL", "OUZEL", "OWLET", "PEWIT", "PIPIT", "PITTA", "PRION", "QUAIL", "RAVEN", "ROBIN", "SAKER", "SCAUP", "SERIN", "SNIPE", "STILT", "STORK", "SWIFT", "TWITE", "VEERY", "VIREO"];
function generateRandomNumber() {return Math.floor(Math.random() * birdArray.length-1) + 1;}
const x = generateRandomNumber();
const chosenWord = birdArray[x]; //word to guess

const textBox = document.querySelector("#wordInput");
const submitButton = document.querySelector("#submit");

let currentRow = 1;
let usedValidWords = [];
let invalidWord = false;
let hasWon = false;
let hasLost = false;

document.addEventListener('DOMContentLoaded', () => {
    submitButton.addEventListener('click', handleSubmitButtonClick);
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleSubmitButtonClick();
    }
});



function handleSubmitButtonClick() {

    if ( hasWon === false && hasLost === false) {
        let wordEntered = textBox.value.trim().toUpperCase();
        let isValid = validateWordEntered(wordEntered);
        if (!isValid) {
            //If invalid message is already displayed don't display it again
            //
            if (invalidWord === false) {
                displayInvalidWordMessage();
                invalidWord = true;
            }
        } else {
            if(invalidWord == true) {
                removeInvalidWordMessage();
                invalidWord = false;

            }
            addWordToGameBoard(wordEntered);
            textBox.value = '';
        }
    }
}

function displayInvalidWordMessage() {
    const gameContainer = document.querySelector('#game-container');
    let newDiv = document.createElement('div');
    newDiv.id = "invalid";
    newDiv.textContent = "Invalid word";
    newDiv.style.color = "red";
    newDiv.style.fontSize = "20px";
    gameContainer.appendChild(newDiv);
}

function removeInvalidWordMessage() {
    const invalidMessage = document.querySelector('#invalid');
    const gameContainer = document.querySelector('#game-container');
    gameContainer.removeChild(invalidMessage);
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

function validateWordEntered(word) {
    // Word entered is only five letters
    if (word.length !== 5) {
        return false;
    }

    // Check if the word is in the birdArray (case insensitive)
    //
    let validBirdName = birdArray.some(bird => bird.toUpperCase() === word);
    if (!validBirdName) {
        return false;
    }

    // Word has not already been chosen
    //
    let alreadyChosenBirdName = usedValidWords.some(usedWord => usedWord === word);
    if(alreadyChosenBirdName){
        return false;
    }

    // Check if the word only contains letters
    //
    const lettersOnlyRegex = /^[A-Za-z]+$/;
    if (!word.match(lettersOnlyRegex)) {
        return false;
    }

    return true;
}

//Parameter: String|word
//fill the word give into the cells identified by #cell#-* were
// # is the row and * is the coloumn
//
function addWordToGameBoard(word){
    for (let x = 0; x < word.length; x++){
        let cell = document.querySelector('#cell' + currentRow + '-' + (x+1));
        cell.textContent = word.charAt(x);
    }
    usedValidWords.push(word);
    colorCells(word)
    currentRow++;
}

//Paramter: string|word
//Colors cells based on if the letter in the cell is in the word
//but in the wrong position and if the word is in the correct position
//
function colorCells(word) {
    let chosenUsedLetterIndex = [];

    //first check for letters in correct positions
    //
    let validPositionCount = 0;
    for (let letterInUserWord = 0; letterInUserWord < word.length; letterInUserWord++) {
        for (let letterInChosenWord = 0; letterInChosenWord < chosenWord.length; letterInChosenWord++) {

            if (word.charAt(letterInUserWord) === chosenWord.charAt(letterInChosenWord) && letterInChosenWord === letterInUserWord) {
                const cell = document.querySelector('#cell' + currentRow + '-' + (letterInUserWord + 1)); //cell index start at 1 not 0 so +1
                cell.classList.add('correct-position')
                chosenUsedLetterIndex.push(letterInChosenWord)
                validPositionCount++;
            }
        }
    }


    //Win/lose condition checks
    //
    if (validPositionCount === 5){
        displayWinMessage();
        hasWon = true;
        return;
    }
    else if(validPositionCount < 5 && currentRow === 6){
        displayLoseMessage()
        hasLost = true;
        return
    }

    //second check for any letter in word but in wrong position
    //
    for (let letterInUserWord = 0; letterInUserWord < word.length; letterInUserWord++) {
        for (let letterInChosenWord = 0; letterInChosenWord < chosenWord.length; letterInChosenWord++) {

            if (word.charAt(letterInUserWord) === chosenWord.charAt(letterInChosenWord) && letterInChosenWord !== letterInUserWord) {
                if (chosenUsedLetterIndex.every(letter => letter !== letterInChosenWord)) {
                    const cell = document.querySelector('#cell' + currentRow + '-' + (letterInUserWord + 1)); //cell index start at 1 not 0 so +1
                    cell.classList.add('wrong-position');
                    chosenUsedLetterIndex.push(letterInChosenWord);
                }
            }
        }
    }
}
