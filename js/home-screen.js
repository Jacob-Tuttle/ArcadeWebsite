const birdleButton = document.querySelector('#birdle-button');
const hangmanButton = document.querySelector('#hangman-button');
const tictactoeButton = document.querySelector('#tictactoe-button');
const snakeButton = document.querySelector('#snake-button');

birdleButton.addEventListener('mouseover', () => {
    drawGameRules("Game Rules: <br> Based off of NYT Wordle, except the theme for this is 5 letter bird names. Yellow tile means letter is in word but in the wrong position, green tile means letter is in the word in the correct position.");
});
birdleButton.addEventListener('mouseout', () => {
    removeGameRules();
});

hangmanButton.addEventListener('mouseover', () => {
    drawGameRules("Game Rules: <br> A random word is chosen and you guess letters to see if they are in the word. Missed letters progress the hangman, figure out the word before the hangman is complete.");
});
hangmanButton.addEventListener('mouseout', () => {
    removeGameRules();
});

tictactoeButton.addEventListener('mouseover', () => {
    drawGameRules("Game Rules: <br> Chose a difficulty and play against the computer. Try to get three x in a row.");
});
tictactoeButton.addEventListener('mouseout', () => {
    removeGameRules();
});

snakeButton.addEventListener('mouseover', () => {
    drawGameRules("Game Rules: <br> Snake game were you move around a growing snake with the arrow keys. The snake grows as you collect the red apples.");
});
snakeButton.addEventListener('mouseout', () => {
    removeGameRules();
});
console.log(window.innerWidth)
let mobileLayoutActive = false;
window.onload = adjustHomeScreenLayout();
window.addEventListener('resize', adjustHomeScreenLayout)


function adjustHomeScreenLayout() {
    const screen = window.innerWidth;
    console.log("Size: " + screen);
    if (screen < 650 && mobileLayoutActive === false) {
        addLogoForMobileLayout();
        removeInternalContent();
        mobileLayoutActive = true;
        const gameRule = document.querySelector('#game-rules')
        const body = document.querySelector('body')
        body.removeChild(gameRule);

        const sidebar = document.querySelector('#side-bar');
        const newGameRuleBox = document.createElement('div');
        newGameRuleBox.id = 'game-rules'
        sidebar.appendChild(newGameRuleBox);

    } else if (screen >= 650 && mobileLayoutActive === true) {
        removeMobileOval();
        addInternalContent()
        mobileLayoutActive = false;

        const gameRule = document.querySelector('#game-rules')
        const sidebar = document.querySelector('#side-bar')
        sidebar.removeChild(gameRule);

        const body = document.querySelector('body');
        const internalContent = document.querySelector('.internal-content')
        const newGameRuleBox = document.createElement('div');
        newGameRuleBox.id = 'game-rules'
        body.insertBefore(newGameRuleBox, internalContent);
    }
}

function addInternalContent() {
    const body = document.querySelector('body');
    const content = document.createElement('div');
    const header = document.createElement('div');
    const oval = document.createElement('div');
    const barTop = document.createElement('div');
    const barBottom = document.createElement('div');
    const text = document.createElement('div');
    const title = document.createElement('h2');
    const end = document.querySelector('#end');

    content.classList.add('internal-content');
    header.id = "header";
    oval.classList.add('oval');
    barTop.classList.add('bar');
    barTop.classList.add('top');
    barBottom.classList.add('bar');
    barBottom.classList.add('bottom');
    text.classList.add('text');
    text.textContent = "Jacob's Arcade";
    title.textContent = "Welcome to Jacob's Arcade";

    content.appendChild(header);
    header.appendChild(oval);
    header.appendChild(title);
    oval.appendChild(barTop);
    oval.appendChild(barBottom);
    oval.appendChild(text);

    body.insertBefore(content, end); // Insert content before end

}


function removeInternalContent() {
    const internalContent = document.querySelector('.internal-content');
    if (internalContent) {
        internalContent.remove();
    }
}

function removeMobileOval() {
    const internalContent = document.querySelector('.oval');
    if (internalContent) {
        internalContent.remove();
    }
}

function addLogoForMobileLayout() {
    const sidebar = document.querySelector('#side-bar');
    const oval = document.createElement('div');
    const barTop = document.createElement('div');
    const barBottom = document.createElement('div');
    const text = document.createElement('div');

    oval.classList.add('oval');
    oval.id = "mobile-oval";

    barTop.classList.add('bar');
    barTop.classList.add('top');
    barBottom.classList.add('bar');
    barBottom.classList.add('bottom');
    text.classList.add('text')
    text.textContent = "Jacob's Arcade";

    const firstChild = sidebar.firstChild;
    sidebar.insertBefore(oval, firstChild)
    oval.appendChild(barTop);
    oval.appendChild(barBottom);
    oval.appendChild(text);
}

function removeGameRules() {
    const ruleBox = document.querySelector('#game-rules');
    ruleBox.textContent = ''
    ruleBox.classList.remove('game-rules')
}

function drawGameRules(rules) {
    const ruleBox = document.querySelector('#game-rules');
    ruleBox.innerHTML = rules;
    if(!mobileLayoutActive){
        ruleBox.classList.add('game-rules');
    }
    else{
        ruleBox.classList.add('game-rules-mobile');

    }

}